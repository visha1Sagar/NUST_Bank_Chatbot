// src/components/Navbar.jsx
import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { modelStatus, loadModel, isLoading } = useContext(AppContext);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLoadModel = async () => {
    await loadModel();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Banking LLM Assistant</h1>
      </div>
      
      <div className="navbar-links">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Files
        </Link>
        <Link 
          to="/chat" 
          className={location.pathname === '/chat' ? 'active' : ''}
        >
          Chat
        </Link>
      </div>
      
      <div className="navbar-actions">
        <div className="model-status">
          <span 
            className={`status-indicator ${modelStatus === 'loaded' ? 'status-success' : 'status-warning'}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          ></span>
          
          {showTooltip && (
            <div className="tooltip">
              Model Status: {modelStatus}
            </div>
          )}
        </div>
        
        <button 
          className={`load-model-btn ${modelStatus === 'loaded' ? 'loaded' : ''}`}
          onClick={handleLoadModel}
          disabled={isLoading || modelStatus === 'loaded'}
        >
          {isLoading ? 'Loading...' : modelStatus === 'loaded' ? 'Model Loaded' : 'Load Model'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;