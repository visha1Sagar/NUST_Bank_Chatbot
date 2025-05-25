// src/components/FileManagement/FileList.jsx
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import FileItem from './FileItem';

const FileList = () => {
  const { files, isLoading, vectorDbStatus, initializeVectorDb } = useContext(AppContext);

  const handleInitializeDb = async () => {
    await initializeVectorDb();
  };

  if (vectorDbStatus === 'unknown' || vectorDbStatus === 'not_initialized') {
    return (
      <div className="file-list-container">
        <div className="empty-state">
          <h2>Vector Database Not Initialized</h2>
          <p>Please initialize the vector database to start adding documents.</p>
          <button 
            className="initialize-db-btn" 
            onClick={handleInitializeDb}
            disabled={isLoading}
          >
            {isLoading ? 'Initializing...' : 'Initialize Vector Database'}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="file-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading documents...</p>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="file-list-container">
        <div className="empty-state">
          <h2>No Documents Yet</h2>
          <p>Upload documents to start using the LLM assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="file-list-container">
      <h2>Uploaded Documents</h2>
      <div className="file-list">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default FileList;