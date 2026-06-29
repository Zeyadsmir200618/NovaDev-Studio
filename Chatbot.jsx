import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function Chatbot() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // --- 1. CONFIG INITIAL STATES ---
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. LOCAL STORAGE MEMORY ENGINE ---
  const [messages, setMessages] = useState(() => {
    const savedChat = localStorage.getItem('novadev_chat_history');
    if (savedChat) {
      try {
        return JSON.parse(savedChat);
      } catch (e) {
        console.error("Error parsing chat history", e);
      }
    }
    // Fallback default message matching language
    return [
      { 
        sender: 'ai', 
        text: isRtl 
          ? 'مرحباً! أنا المساعد الذكي لنوفا ديف. كيف يمكنني مساعدتك اليوم؟' 
          : 'Hello! I am the NovaDev AI Assistant. How can I help you today?' 
      }
    ];
  });

  // Automatically save history whenever the array changes
  useEffect(() => {
    localStorage.setItem('novadev_chat_history', JSON.stringify(messages));
  }, [messages]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // --- 3. SUBMIT HANDLER ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `
        You are the official AI assistant for "NovaDev Studio", a premium software agency. 
        NovaDev builds websites, mobile apps (iOS/Android), games, and custom enterprise software.
        The user is currently browsing the website and speaking in ${isRtl ? 'Arabic' : 'English'}.
        Answer their question politely, professionally, and concisely (under 3 sentences). 
        Always encourage them to use the "Contact" page for a free quote.
        
        User's message: "${userText}"
      `;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: isRtl ? 'عذراً، أواجه مشكلة في الاتصال بالخادم حالياً.' : 'Sorry, I am having trouble connecting to my servers right now.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      drag={!isOpen} 
      dragMomentum={false} 
      dragConstraints={{ 
        top: -window.innerHeight + 150, 
        bottom: 0, 
        left: -window.innerWidth + 150, 
        right: 0 
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-blue p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <span className="font-bold font-heading">NovaDev AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-slate-200 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="h-[400px] p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' && isRtl ? 'flex-row-reverse' : ''}`}>
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white shrink-0">
                        <Bot size={16} />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-brand-blue text-white rounded-br-none' 
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-none'
                    }`}>
                      <div className="space-y-1 flex flex-col [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4">
                        <ReactMarkdown>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-bl-none">
                      <Loader2 size={16} className="text-brand-blue animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={isRtl ? 'اكتب رسالتك هنا...' : 'Type your message...'}
                className="flex-1 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-blue outline-none dark:text-white text-sm disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-full bg-brand-blue hover:bg-blue-600 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} className={isRtl ? 'rotate-180' : ''} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-brand-blue hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${!isOpen ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </motion.div>
  );
}