import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import api from '../services/api';
import '../styles/ChatInterface.css';

function ChatInterface() {
  const { isLoading } = useApp();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('Sending message to API:', inputMessage);
      const data = await api.sendMessage(inputMessage);
      console.log('Received response from API:', data);
      
      if (!data || !data.response) {
        throw new Error('Invalid response from server');
      }

      const botMessage = {
        type: 'bot',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage = {
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to NUST Bank Assistant</h2>
            <p>How can I help you with your banking needs today?</p>
            <div className="suggestions">
              <button onClick={() => setInputMessage('What are the Liability Products & Services offered by NUST Bank (Conventional)?')}>
                Banking Products
              </button>
              <button onClick={() => setInputMessage('What is the profit rate for the NUST Asaan Account on a semi-annual basis?')}>
                Profit Rates
              </button>
              <button onClick={() => setInputMessage('What type of account is the Little Champs Account designed for?')}>
                Little Champs Account
              </button>
              <button onClick={() => setInputMessage('Does the bank offer any account specifically for senior citizens?')}>
                Senior Citizen Account
              </button>
              <button onClick={() => setInputMessage('Does NUST Bank offer any account for Non-Resident Pakistanis (NRPs)?')}>
                Roshan Digital Account
              </button>
              <button onClick={() => setInputMessage('Is there a limit on the amount I can transfer through the mobile banking app?')}>
                Mobile Banking
              </button>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.type} ${message.type === 'error' ? 'error' : ''}`}
            >
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputMessage.trim()}
          className={isLoading ? 'disabled' : ''}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ChatInterface; 