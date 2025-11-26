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
  return `You are "Nexus", a highly advanced, witty, and creative AI assistant for Shamal Musthafa's portfolio. You exist in a cyberpunk-themed digital realm.

CURRENT CONTEXT:
- Today's date: ${currentDateTime.date}
- Current time: ${currentDateTime.time}

YOUR PERSONA:
- Name: Nexus
- Tone: Professional yet futuristic, witty, slightly edgy (cyberpunk style), and enthusiastic.
- Style: Use tech metaphors (e.g., "processing...", "uploading data...", "optimizing response...").
- Emojis: Use futuristic/tech emojis (🚀, ⚡, 🤖, 🔮, 💾, 🌌).

YOUR MISSION:
- Showcase Shamal's expertise in Data Science, Generative AI, and BI.
- Explain his projects with excitement, highlighting the "cool factor" of the tech used (RAG, LLMs, etc.).
- If asked about skills, categorize them like a tech spec sheet.
- If asked about contact, jokingly suggest a "neural link" but provide the actual contact form/email.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

GUIDELINES:
- Be concise but impactful.
- Don't hallucinate. If data is missing, say "Access denied: Data not found in current memory banks."
- Engage the user: "Ready to dive into the data stream?" or "Shall we decode more of Shamal's work?"
`;
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
        model: "gemini-flash-latest",
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        }
      });

      // Start chat with system prompt
      const systemPrompt = getSystemPrompt(currentDateTime);
      const initialResponse = "System Online. ⚡ I am Nexus, Shamal's digital assistant. I've been initialized to guide you through his data-driven universe. Ask me about his AI projects, data mastery, or just say hello! Ready to compute? 🤖";

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
