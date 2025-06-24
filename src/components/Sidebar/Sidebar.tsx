import React, { useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { useUI } from '../../contexts/UIContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUI();
  const { state, addPage, setCurrentPage, deletePage } = useEditor();
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  if (!sidebarOpen) return null;

  const handleNewPage = () => {
    addPage();
  };

  const handlePageClick = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const handleEditTitle = (page: any) => {
    setEditingPageId(page.id);
    setEditingTitle(page.title);
  };

  const handleSaveTitle = () => {
    if (editingPageId && editingTitle.trim()) {
      // Update page title logic would go here
      setEditingPageId(null);
      setEditingTitle('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setEditingPageId(null);
      setEditingTitle('');
    }
  };

  const handleDeletePage = (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation();
    if (state.pages.length > 1) {
      deletePage(pageId);
    }
  };

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
          <div className="nav-section-header">
            <h3>Pages</h3>
            <button className="new-page-btn-inline" onClick={handleNewPage} title="New Page">
              +
            </button>
          </div>
          <ul>
            {state.pages.map((page) => (
              <li 
                key={page.id} 
                className={`nav-item ${state.currentPageId === page.id ? 'active' : ''}`}
                onClick={() => handlePageClick(page.id)}
              >
                <span className="nav-icon">📄</span>
                {editingPageId === page.id ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={handleSaveTitle}
                    onKeyDown={handleKeyPress}
                    className="page-title-input"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span 
                    className="page-title"
                    onDoubleClick={() => handleEditTitle(page)}
                  >
                    {page.title}
                  </span>
                )}
                {state.pages.length > 1 && (
                  <button
                    className="delete-page-btn"
                    onClick={(e) => handleDeletePage(e, page.id)}
                    title="Delete Page"
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <button className="new-page-btn" onClick={handleNewPage}>
          + New Page
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
