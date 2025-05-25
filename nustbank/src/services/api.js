// src/services/api.js
const API_BASE_URL = 'https:localhost.com:8000';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const api = {
  addDocument: async (formData) => {
    try {
      console.log('Adding document...');
      const response = await fetch(`${API_BASE_URL}/vector-db/add-document`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Add Document Response:', data);
      return {
        success: true,
        file_id: data.file_id,
        filename: data.filename,
        size: data.size,
        status: data.status
      };
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  },

  sendMessage: async (message) => {
    try {
      console.log('Sending message:', message);
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          query: message,
          history: [] // Add chat history if needed
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Chat Response:', data);
      return {
        response: data.answer,
        sources: data.sources || []
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default api;