// src/components/Chat/ChatInterface.jsx
import { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../contexts/AppContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

import api from '../../services/api';


const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { modelStatus, loadModel } = useContext(AppContext);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content) => {
    // Check if model is loaded, if not try to load it
    if (modelStatus !== 'loaded') {
      await loadModel();
    }

    // Add user message to chat
    const userMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Send message to API
      const response = await api.sendChatMessage(content);
      
      // Add assistant response to chat
      const assistantMessage = {
        role: 'assistant',
        content: response.response || 'I apologize, but I couldn\'t generate a response at this time.',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again later.',
        timestamp: new Date().toISOString(),
        isError: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Banking Assistant</h2>
        <p className="chat-description">
          Ask questions about banking services and policies
        </p>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h3>Welcome to Banking LLM Assistant</h3>
            <p>
              I'm here to help answer your banking questions based on the uploaded documents.
              How can I assist you today?
            </p>
            <div className="suggested-questions">
              <h4>You can ask me about:</h4>
              <ul>
                <li>Account services</li>
                <li>Banking policies</li>
                <li>Loan options</li>
                <li>Security practices</li>
              </ul>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isProcessing}
      />
    </div>
  );
};

export default ChatInterface;