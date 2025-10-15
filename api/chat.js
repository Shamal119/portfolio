import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load resume data
const resumeDataPath = path.join(__dirname, '..', 'src', 'data', 'resumeData.json');
const resumeData = JSON.parse(fs.readFileSync(resumeDataPath, 'utf8'));

// Configure Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Global variable to store chat sessions
const chatSessions = {};

function getCurrentDateTime() {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    }),
    timestamp: now.toISOString()
  };
}

function getSystemPrompt(currentDateTime) {
  return `You are Shamal, a helpful and friendly AI chatbot for Shamal Musthafa's personal portfolio website. 

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
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message, session_id = 'default' } = req.body;

    if (!message || !message.trim()) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const currentDateTime = getCurrentDateTime();

    // Get or create chat session
    if (!chatSessions[session_id]) {
      // Create new chat session
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        }
      });

      // Start chat with system prompt
      const systemPrompt = getSystemPrompt(currentDateTime);
      const initialResponse = "Hi there! 👋 I'm Shamal, your AI assistant for Shamal Musthafa's portfolio. I'm here to help you learn about my skills, experience, and projects. Whether you're interested in my technical expertise, past work, or just want to know more about my background, I'm happy to chat! What would you like to know? 😊";

      const chatSession = model.startChat({
        history: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "model", parts: [{ text: initialResponse }] }
        ]
      });

      chatSessions[session_id] = chatSession;
    }

    // Get the chat session
    const chatSession = chatSessions[session_id];

    // Send message and get response
    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      response: text,
      session_id: session_id,
      timestamp: currentDateTime.timestamp
    });

  } catch (error) {
    console.error('Chat error:', error);

    // Handle specific API errors
    if (error.message.includes('API key')) {
      res.status(401).json({ error: 'Invalid or missing API key' });
      return;
    }

    if (error.message.toLowerCase().includes('quota')) {
      res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
      return;
    }

    // Generic error response
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
