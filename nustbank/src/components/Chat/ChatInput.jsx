// src/components/Chat/ChatInput.jsx
import { useState } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question here..."
          disabled={isLoading}
          className="chat-input"
        />
        
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <span className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          ) : (
            <span className="send-icon">➤</span>
          )}
        </button>
      </div>
      
      {isLoading && <div className="typing-indicator">Assistant is typing...</div>}
    </form>
  );
};

export default ChatInput;