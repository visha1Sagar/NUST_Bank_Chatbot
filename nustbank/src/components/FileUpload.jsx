import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import '../styles/FileUpload.css';

function FileUpload() {
  const { uploadFile, isLoading } = useApp();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/csv',
        'application/json'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Please upload a valid file type (PDF, DOC, DOCX, TXT, CSV, or JSON)');
        setSelectedFile(null);
        return;
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size should be less than 10MB');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadProgress(0);
      const success = await uploadFile(selectedFile);
      
      if (success) {
        setSelectedFile(null);
        setUploadProgress(100);
        // Reset progress after a delay
        setTimeout(() => setUploadProgress(0), 1000);
      }
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="file-upload-container">
      <div className="upload-section">
        <h2>Upload Banking Documents</h2>
        <div className="upload-box">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileSelect}
            disabled={isLoading}
            accept=".pdf,.doc,.docx,.txt,.csv,.json"
            style={{ display: 'none' }}
          />
          <div className="upload-controls">
            <label htmlFor="file-upload" className="upload-button">
              {isLoading ? 'Uploading...' : 'Choose File'}
            </label>
            {selectedFile && (
              <button
                className="upload-submit-button"
                onClick={handleUpload}
                disabled={isLoading}
              >
                Upload
              </button>
            )}
          </div>
          
          {selectedFile && (
            <div className="selected-file">
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-size">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}

          {uploadError && (
            <div className="error-message">{uploadError}</div>
          )}

          {uploadProgress > 0 && (
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload; 