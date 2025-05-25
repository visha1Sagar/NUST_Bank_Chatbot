// src/components/Layout.jsx
import { useContext } from 'react';
import Navbar from './Navbar';
import { AppContext } from '../contexts/AppContext';

const Layout = ({ children }) => {
  const { error, clearError } = useContext(AppContext);
  
  return (
    <div className="app-layout">
      <Navbar />
      
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={clearError} className="close-btn">
            &times;
          </button>
        </div>
      )}
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>Banking LLM Assistant &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Layout;