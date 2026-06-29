import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Components & Pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot'; // <-- Import the Chatbot

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-brand-lightBg dark:bg-brand-darkBg text-slate-900 dark:text-white transition-colors duration-300 flex flex-col relative">
          
          <Navbar />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} /> 
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>

          <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800 mt-auto text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} NovaDev Studio. All rights reserved.</p>
          </footer>

          {/* Global AI Chatbot Widget */}
          <Chatbot /> 

        </div>
      </Router>
    </ThemeProvider>
  );
}