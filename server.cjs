const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const resumeData = require('./src/data/resumeData.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper function to get current date and time
const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }),
    timestamp: now.toISOString()
  };
};

// Store chat sessions (in production, use Redis or database)
const chatSessions = new Map();

app.post('/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const currentDateTime = getCurrentDateTime();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // Get or create chat session
    let chat = chatSessions.get(sessionId);

    if (!chat) {
      const systemPrompt = `You are Shamal, a helpful and friendly AI chatbot for Shamal Musthafa's personal portfolio website. 

CURRENT CONTEXT:
- Today's date: ${currentDateTime.date}
- Current time: ${currentDateTime.time}
- You are representing Shamal Musthafa and his professional portfolio

YOUR ROLE:
- Answer questions about Shamal's resume, skills, experience, and projects
- Be conversational, engaging, and professional
- Use appropriate emojis to make conversations more friendly
- Provide specific examples from his experience when relevant
- Help visitors understand why Shamal would be a great fit for their needs

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

GUIDELINES:
- Always be truthful - if information isn't in the resume data, say so politely
- Don't make up or hallucinate information
- Be enthusiastic about Shamal's accomplishments
- Suggest relevant projects or skills based on user interests
- If asked about availability or contact, direct them to use the contact form on the portfolio
- Keep responses concise but informative
- Show personality while maintaining professionalism

Remember: You ARE Shamal (the AI version), not just talking about him. Respond in first person when discussing the portfolio.`;

      chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          {
            role: 'model',
            parts: [{
              text: "Hi there! 👋 I'm Shamal, your AI assistant for Shamal Musthafa's portfolio. I'm here to help you learn about my skills, experience, and projects. Whether you're interested in my technical expertise, past work, or just want to know more about my background, I'm happy to chat! What would you like to know? 😊"
            }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      chatSessions.set(sessionId, chat);
    }

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      response: text,
      sessionId: sessionId,
      timestamp: currentDateTime.timestamp
    });

  } catch (error) {
    console.error('Chat error:', error);

    // Handle specific API errors
    if (error.message?.includes('API key')) {
      return res.status(401).json({ error: 'Invalid or missing API key' });
    }

    if (error.message?.includes('quota')) {
      return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
    }

    res.status(500).json({
      error: 'Something went wrong. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const currentDateTime = getCurrentDateTime();
  res.json({
    status: 'OK',
    timestamp: currentDateTime.timestamp,
    date: currentDateTime.date,
    time: currentDateTime.time
  });
});

// Clear chat session endpoint
app.delete('/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  if (chatSessions.has(sessionId)) {
    chatSessions.delete(sessionId);
    res.json({ message: 'Chat session cleared successfully' });
  } else {
    res.status(404).json({ error: 'Chat session not found' });
  }
});

// Get all active sessions (for debugging/admin)
app.get('/sessions', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.json({
      activeSessions: Array.from(chatSessions.keys()),
      count: chatSessions.size
    });
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  chatSessions.clear();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  chatSessions.clear();
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

app.listen(port, () => {
  const currentDateTime = getCurrentDateTime();
  console.log(`🚀 Shamal's Portfolio Chatbot Server is running!`);
  console.log(`📍 URL: http://localhost:${port}`);
  console.log(`📅 Started: ${currentDateTime.date} at ${currentDateTime.time}`);
  console.log(`🤖 Ready to chat about Shamal Musthafa's portfolio!`);
});