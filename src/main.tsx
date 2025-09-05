import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Fix for mobile viewport height issues
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Additional mobile fixes
  if (window.innerWidth <= 768) {
    // Force proper scaling on mobile
    document.documentElement.style.setProperty('--mobile-scale', '1');
    document.body.style.transform = 'scale(1)';
    document.body.style.zoom = '1';
  }
};

// Set the CSS custom property on load
setVH();

// Update on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', () => {
  setTimeout(setVH, 100); // Delay to ensure proper orientation detection
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)