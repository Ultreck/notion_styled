
import React from 'react';
import { useUI } from '../../contexts/UIContext';
import './Header.css';

const Header: React.FC = () => {
  const { sidebarOpen, toggleSidebar, darkMode, toggleDarkMode } = useUI();

  return (
    <header className="header">
      <div className="header-left">
        {!sidebarOpen && (
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
        )}
        <div className="breadcrumb">
          <span className="breadcrumb-item">Workspace</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item current">Untitled</span>
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-btn" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button className="header-btn">Share</button>
        <button className="header-btn">•••</button>
      </div>
    </header>
  );
};

export default Header;
