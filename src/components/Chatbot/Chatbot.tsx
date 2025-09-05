import React, { useState, useEffect, useRef } from 'react';
import ChatbotIcon from './ChatbotIcon';
import { getApiEndpoint, isApiAvailable } from '../../config/api';
import './Chatbot.css';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Greet the user when the chat is opened for the first time
      setMessages([{ sender: 'bot', text: "Hello! I'm Shamal, an AI assistant for Shamal Musthafa's portfolio. I can answer questions about his skills, experience, and projects. What would you like to know? 😊" }]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Check if API is available
    if (!isApiAvailable()) {
      setMessages((prevMessages) => [...prevMessages, { 
        sender: 'bot' as 'bot', 
        text: 'Sorry, the chatbot is currently unavailable. Please contact me directly through the contact form or email.' 
      }]);
      return;
    }

    const newMessages = [...messages, { sender: 'user' as 'user', text: inputValue }];
    setMessages(newMessages);
    const currentInputValue = inputValue;
    setInputValue('');

    try {
      const response = await fetch(getApiEndpoint('/chat'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInputValue }),
      });

      const data = await response.json();
      const botMessage = data.response;

      setMessages((prevMessages) => [...prevMessages, { sender: 'bot' as 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot' as 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
    }
  };

  return (
    <div className="chatbot-container" style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 1001,
      opacity: 1,
      visibility: 'visible',
      display: 'block'
    }}>
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chat with Shamal's AI</span>
            <button onClick={toggleChat}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <ChatbotIcon onClick={toggleChat} />
      )}
    </div>
  );
};

export default Chatbot;
