import React, { useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot/Chatbot';
import { Box } from '@mui/material';

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatbotRef = useRef<{ toggleChat: () => void } | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNavigation = (section: string) => {
    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'resume') {
      window.location.href = '/resume';
    } else {
      const element = document.getElementById(section);
      if (element) {
        const headerHeight = 70;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleChatToggle = () => {
    if (chatbotRef.current) {
      chatbotRef.current.toggleChat();
    }
  };

  return (
    <>
      <div className="layout">
        {isHomePage && (
          <Header 
            onNavigate={handleNavigation} 
            onChatToggle={handleChatToggle}
          />
        )}
        
        <main style={{ paddingTop: isHomePage ? '70px' : '0' }}>
          <Outlet />
        </main>
        
        <Footer />
      </div>
      
      {/* Chatbot outside layout for proper floating */}
      <Chatbot ref={chatbotRef} />
    </>
  );
};

export default Layout;
