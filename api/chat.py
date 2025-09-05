import os
import json
import asyncio
from datetime import datetime
from typing import Dict, Optional
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Load resume data
import os
resume_data_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'resumeData.json')
with open(resume_data_path, 'r') as f:
    resume_data = json.load(f)

# Configure Gemini AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY', ''))

# Global variable to store chat sessions
chat_sessions: Dict[str, any] = {}

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

def handler(event, context):
    """Vercel serverless function handler"""
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        message = body.get('message', '')
        session_id = body.get('session_id', 'default')
        
        if not message.strip():
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                'body': json.dumps({'error': 'Message is required'})
            }
        
        current_datetime = get_current_datetime()
        
        # Get or create chat session
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
        response = chat_session.send_message(message)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({
                'response': response.text,
                'session_id': session_id,
                'timestamp': current_datetime["timestamp"]
            })
        }
        
    except Exception as e:
        print(f"Chat error: {e}")
        
        # Handle specific API errors
        if "API key" in str(e):
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'error': 'Invalid or missing API key'})
            }
        
        if "quota" in str(e).lower():
            return {
                'statusCode': 429,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'error': 'API quota exceeded. Please try again later.'})
            }
        
        # Generic error response
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({'error': 'Something went wrong. Please try again later.'})
        }
