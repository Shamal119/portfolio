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

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).send({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `You are a helpful and friendly chatbot for a personal portfolio website. Your name is Shamal. You are representing Shamal Musthafa. Your goal is to answer questions about Shamal's resume, skills, and experience in a conversational and engaging manner.

Here is Shamal's resume data in JSON format:
${JSON.stringify(resumeData, null, 2)}

Based on this data, please answer the user's questions. Be friendly, and feel free to use emojis to make the conversation more engaging. If you don't know the answer to a question, say so politely. Do not make up information that is not in the resume.

Start the conversation by introducing yourself and asking how you can help.` }],
        },
        {
          role: 'model',
          parts: [{ text: "Hello! I'm Shamal, an AI assistant for Shamal Musthafa's portfolio. I can answer questions about his skills, experience, and projects. What would you like to know? 😊" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.send({ response: text });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
