import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResumePage from './components/ResumePage';
import Layout from './components/Layout';
import React from 'react';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
