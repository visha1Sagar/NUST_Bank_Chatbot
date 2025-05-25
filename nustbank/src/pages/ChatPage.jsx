// src/pages/ChatPage.jsx
import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { useApp } from '../contexts/AppContext';

function ChatPage() {
  const { isModelLoaded, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Initializing Banking Assistant...</p>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <h1 className="page-title">Banking Assistant</h1>
      <p className="page-description">
        Ask questions about our banking services, policies, and procedures. The assistant will provide accurate information based on our official documents.
      </p>
      <div className="chat-suggestions">
        <h3>Example Questions:</h3>
        <ul>
          <li>What are the requirements for opening a new account?</li>
          <li>How do I apply for a loan?</li>
          <li>What are the current interest rates?</li>
          <li>How do I report a lost card?</li>
        </ul>
      </div>
      <ChatInterface isModelLoaded={isModelLoaded} />
    </div>
  );
}

export default ChatPage;