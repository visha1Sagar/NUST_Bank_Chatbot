// src/components/FileManagement/FileItem.jsx
import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const FileItem = ({ file }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { deleteFile, isLoading } = useContext(AppContext);

  const handleDelete = async () => {
    if (confirmDelete) {
      await deleteFile(file.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  // Get file extension from filename
  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return '📄';
      case 'txt':
        return '📝';
      case 'json':
      case 'csv':
        return '📊';
      case 'doc':
      case 'docx':
        return '📃';
      default:
        return '📁';
    }
  };

  // Format file size
  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  return (
    <div className="file-item">
      <div className="file-icon">
        {getFileIcon(file.name)}
      </div>
      
      <div className="file-details">
        <h3 className="file-name">{file.name}</h3>
        <div className="file-meta">
          <span className="file-size">{formatFileSize(file.size || 0)}</span>
          {file.uploadedAt && (
            <span className="file-date">
              {new Date(file.uploadedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="file-actions">
        <button 
          className={`delete-btn ${confirmDelete ? 'confirm' : ''}`}
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : confirmDelete ? 'Confirm Delete?' : 'Delete'}
        </button>
        
        {confirmDelete && (
          <button 
            className="cancel-btn"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default FileItem;