import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', marginTop: 'auto' }}>
      <p>© {new Date().getFullYear()} Shamal Musthafa. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
