
import React from 'react';
import { useUI } from '../../contexts/UIContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUI();

  if (!sidebarOpen) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Workspace</h2>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ×
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3>Pages</h3>
          <ul>
            <li className="nav-item active">
              <span className="nav-icon">📄</span>
              <span>Untitled</span>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3>Recent</h3>
          <ul>
            <li className="nav-item">
              <span className="nav-icon">📝</span>
              <span>Meeting Notes</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">💡</span>
              <span>Ideas</span>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <button className="new-page-btn">+ New Page</button>
      </div>
    </aside>
  );
};

export default Sidebar;
