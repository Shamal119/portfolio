import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ChatbotIcon from './ChatbotIcon';
import LoadingSkeleton from '../LoadingSkeleton';
import { getApiEndpoint, isApiAvailable } from '../../config/api';
import './Chatbot.css';

export interface ChatbotRef {
  toggleChat: () => void;
}

const Chatbot = forwardRef<ChatbotRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Ensure chatbot stays visible on mobile during scroll
  useEffect(() => {
    const handleViewportChange = () => {
      // Force repaint to ensure fixed positioning works correctly
      const container = document.querySelector('.chatbot-container') as HTMLElement;
      if (container) {
        container.style.transform = 'translateZ(0)';
      }
    };

    // Listen for viewport changes (scroll, resize, orientation)
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    return () => {
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, []);

  const toggleChat = () => {
    if (isOpen) {
      // Smooth closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
      setIsClosing(false);
      if (messages.length === 0) {
        // Show loading skeleton first, then greet
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([{ 
            sender: 'bot', 
            text: "👋 Hi there! I'm Shamal's AI assistant. I can help you learn about his skills, experience, and projects. What would you like to know?" 
          }]);
        }, 800);
      }
    }
  };

  // Expose toggleChat method via ref
  useImperativeHandle(ref, () => ({
    toggleChat,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const currentInputValue = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    // Add user message immediately
    const newMessages = [...messages, { sender: 'user' as 'user', text: currentInputValue }];
    setMessages(newMessages);

    // Check if API is available
    if (!isApiAvailable()) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { 
          sender: 'bot' as 'bot', 
          text: '🔧 Sorry, the chatbot is currently unavailable. Please contact Shamal directly through the contact form or email for immediate assistance!' 
        }]);
      }, 1000);
      return;
    }

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

      // Simulate typing delay for better UX
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot' as 'bot', text: botMessage }]);
      }, 800);
    } catch (error) {
      console.error('Error sending message:', error);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { 
          sender: 'bot' as 'bot', 
          text: '❌ Sorry, something went wrong. Please try again or contact Shamal directly!' 
        }]);
      }, 1000);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'chatbot-open' : ''}`}>
      {isOpen ? (
        <div className={`chatbot-window ${isClosing ? 'closing' : ''}`}>
          <div className="chatbot-header">
            <span>💬 Chat with Shamal's AI</span>
            <button onClick={toggleChat} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about Shamal..."
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              {isTyping ? '⏳' : '📤'}
            </button>
          </div>
        </div>
      ) : (
        <ChatbotIcon onClick={toggleChat} />
      )}
    </div>
  );
});

export default Chatbot;
