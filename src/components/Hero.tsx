import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div 
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Shamal Musthafa</h1>
      <h2>Data Scientist & AI Engineer</h2>
      <p>Specializing in Generative AI, LLMs, and Cloud AI solutions</p>
      <div className="cta-buttons">
        <a href="#contact" className="primary-btn">Get in Touch</a>
        <a href="#projects" className="secondary-btn">View Projects</a>
      </div>
    </motion.div>
  );
};

export default Hero;