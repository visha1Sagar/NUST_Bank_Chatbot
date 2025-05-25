// src/components/Chat/ChatMessage.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const { role, content, timestamp } = message;
  
  return (
    <div className={`chat-message ${role === 'user' ? 'user-message' : 'assistant-message'}`}>
      <div className="message-header">
        <span className="message-sender">
          {role === 'user' ? 'You' : 'Banking Assistant'}
        </span>
        {timestamp && (
          <span className="message-time">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>
      
      <div className="message-content">
        {role === 'user' ? (
          <p>{content}</p>
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;