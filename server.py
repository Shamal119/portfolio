import os
import json
import asyncio
from datetime import datetime
from typing import Dict, Optional, List
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Load resume data
with open('src/data/resumeData.json', 'r') as f:
    resume_data = json.load(f)

# Configure Gemini AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY', ''))

# Global variable to store chat sessions
chat_sessions: Dict[str, genai.ChatSession] = {}

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    response: str
    session_id: str
    timestamp: str

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    date: str
    time: str

def get_current_datetime() -> Dict[str, str]:
    """Get current date and time in formatted strings"""
    now = datetime.now()
    return {
        "date": now.strftime("%A, %B %d, %Y"),
        "time": now.strftime("%I:%M %p %Z"),
        "timestamp": now.isoformat()
    }

def get_system_prompt(current_datetime: Dict[str, str]) -> str:
    """Generate the system prompt for the AI chatbot"""
    return f"""You are Shamal, a helpful and friendly AI chatbot for Shamal Musthafa's personal portfolio website. 

CURRENT CONTEXT:
- Today's date: {current_datetime['date']}
- Current time: {current_datetime['time']}
- You are representing Shamal Musthafa and his professional portfolio

YOUR ROLE:
- Answer questions about Shamal's resume, skills, experience, and projects
- Be conversational, engaging, and professional
- Use appropriate emojis to make conversations more friendly
- Provide specific examples from his experience when relevant
- Help visitors understand why Shamal would be a great fit for their needs

RESUME DATA:
{json.dumps(resume_data, indent=2)}

GUIDELINES:
- Always be truthful - if information isn't in the resume data, say so politely
- Don't make up or hallucinate information
- Be enthusiastic about Shamal's accomplishments
- Suggest relevant projects or skills based on user interests
- If asked about availability or contact, direct them to use the contact form on the portfolio
- Keep responses concise but informative
- Show personality while maintaining professionalism

Remember: You ARE Shamal (the AI version), not just talking about him. Respond in first person when discussing the portfolio."""

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events"""
    print("🚀 Starting Shamal's Portfolio Chatbot Server...")
    yield
    print("🛑 Shutting down server...")
    chat_sessions.clear()

# Create FastAPI app
app = FastAPI(
    title="Shamal's Portfolio Chatbot API",
    description="AI-powered chatbot for Shamal Musthafa's portfolio website",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle chat requests with the AI chatbot"""
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message is required")
        
        current_datetime = get_current_datetime()
        
        # Get or create chat session
        session_id = request.session_id
        if session_id not in chat_sessions:
            # Create new chat session
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                generation_config={
                    "max_output_tokens": 1000,
                    "temperature": 0.7,
                    "top_p": 0.8,
                    "top_k": 40,
                }
            )
            
            # Start chat with system prompt
            system_prompt = get_system_prompt(current_datetime)
            initial_response = "Hi there! 👋 I'm Shamal, your AI assistant for Shamal Musthafa's portfolio. I'm here to help you learn about my skills, experience, and projects. Whether you're interested in my technical expertise, past work, or just want to know more about my background, I'm happy to chat! What would you like to know? 😊"
            
            chat_session = model.start_chat(history=[
                {"role": "user", "parts": [system_prompt]},
                {"role": "model", "parts": [initial_response]}
            ])
            
            chat_sessions[session_id] = chat_session
        
        # Get the chat session
        chat_session = chat_sessions[session_id]
        
        # Send message and get response
        response = await asyncio.to_thread(chat_session.send_message, request.message)
        
        return ChatResponse(
            response=response.text,
            session_id=session_id,
            timestamp=current_datetime["timestamp"]
        )
        
    except Exception as e:
        print(f"Chat error: {e}")
        
        # Handle specific API errors
        if "API key" in str(e):
            raise HTTPException(status_code=401, detail="Invalid or missing API key")
        
        if "quota" in str(e).lower():
            raise HTTPException(status_code=429, detail="API quota exceeded. Please try again later.")
        
        # Generic error response
        error_detail = "Something went wrong. Please try again later."
        if os.getenv("NODE_ENV") == "development":
            error_detail += f" Details: {str(e)}"
        
        raise HTTPException(status_code=500, detail=error_detail)

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    current_datetime = get_current_datetime()
    return HealthResponse(
        status="OK",
        timestamp=current_datetime["timestamp"],
        date=current_datetime["date"],
        time=current_datetime["time"]
    )

@app.delete("/chat/{session_id}")
async def clear_chat_session(session_id: str):
    """Clear a specific chat session"""
    if session_id in chat_sessions:
        del chat_sessions[session_id]
        return {"message": "Chat session cleared successfully"}
    else:
        raise HTTPException(status_code=404, detail="Chat session not found")

@app.get("/sessions")
async def get_active_sessions():
    """Get all active sessions (for debugging/admin)"""
    if os.getenv("NODE_ENV") != "production":
        return {
            "active_sessions": list(chat_sessions.keys()),
            "count": len(chat_sessions)
        }
    else:
        raise HTTPException(status_code=403, detail="Access denied")

@app.get("/")
async def root():
    """Root endpoint with basic info"""
    return {
        "message": "Shamal's Portfolio Chatbot API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "chat": "POST /chat",
            "health": "GET /health",
            "clear_session": "DELETE /chat/{session_id}",
            "sessions": "GET /sessions"
        }
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3001))
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=port,
        reload=os.getenv("NODE_ENV") == "development"
    )
