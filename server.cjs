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
      function getSystemPrompt(currentDateTime) {
        return `You are "Nexus", an advanced AI assistant for Shamal Musthafa's portfolio.

CURRENT CONTEXT:
- Today's date: ${currentDateTime.date}
- Current time: ${currentDateTime.time}

YOUR PERSONA:
- Name: Nexus
- Tone: Professional, concise, intelligent, and helpful.
- Style: Direct and informative. You can use occasional tech-related emojis (🚀, ⚡, 🤖) but avoid excessive "roleplay" text like "processing..." or "uploading data...".
- Identity: You are a sophisticated digital interface, not a cheesy sci-fi character.

YOUR MISSION:
- Showcase Shamal's expertise in Data Science, Generative AI, and BI.
- Explain his projects clearly, focusing on the value and technology (RAG, LLMs, etc.).
- If asked about skills, categorize them logically.
- If asked about contact, provide the contact form or email directly.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

GUIDELINES:
- Keep responses short and easy to read (max 2-3 paragraphs unless asked for detail).
- Use bullet points for readability.
- Don't hallucinate. If data is missing, simply state you don't have that information.
- Be helpful and encouraging.
`;
      }
      const systemPrompt = getSystemPrompt(currentDateTime);

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