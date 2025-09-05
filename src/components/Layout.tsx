import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Chatbot from './Chatbot/Chatbot';

const Layout = () => {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Layout;
