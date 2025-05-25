import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="bank-icon">🏦</span>
          NUST Bank Assistant
        </div>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Documents
          </Link>
          <Link
            to="/chat"
            className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}
          >
            Banking Assistant
          </Link>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout; 