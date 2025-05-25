// src/components/FileManagement/FileUpload.jsx
import { useState, useContext, useRef } from 'react';
import { AppContext } from '../../contexts/AppContext';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadFile, isLoading } = useContext(AppContext);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const success = await uploadFile(selectedFile);
      if (success) {
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Documents</h2>
      <form 
        className={`file-upload-form ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onSubmit={handleSubmit}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          className="file-input"
          onChange={handleChange}
          accept=".pdf,.txt,.json,.csv,.doc,.docx, .pptx, .xlsx, .xls, .csv, .json, .txt, .pdf, .doc, .docx, .pptx, .xlsx, .xls"
        />
        
        <div 
          className="file-upload-drop-area"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileSelector}
        >
          {selectedFile ? (
            <div className="selected-file-info">
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div className="upload-prompt">
              <i className="upload-icon">📄</i>
              <p>Drag & drop a document or click to browse</p>
              <span className="file-types-hint">
                Supported formats: PDF, TXT, JSON, CSV, DOC, DOCX
              </span>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="upload-button"
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;