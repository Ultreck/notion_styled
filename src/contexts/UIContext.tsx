
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIState {
  sidebarOpen: boolean;
  darkMode: boolean;
  showBlockMenu: boolean;
  blockMenuPosition: { x: number; y: number } | null;
  selectedBlockId: string | null;
}

interface UIContextType extends UIState {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  showBlockMenuAt: (x: number, y: number, blockId: string) => void;
  hideBlockMenu: () => void;
  setSelectedBlock: (id: string | null) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [blockMenuPosition, setBlockMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const showBlockMenuAt = (x: number, y: number, blockId: string) => {
    setBlockMenuPosition({ x, y });
    setSelectedBlockId(blockId);
    setShowBlockMenu(true);
  };
  
  const hideBlockMenu = () => {
    setShowBlockMenu(false);
    setBlockMenuPosition(null);
    setSelectedBlockId(null);
  };
  
  const setSelectedBlock = (id: string | null) => {
    setSelectedBlockId(id);
  };

  return (
    <UIContext.Provider value={{
      sidebarOpen,
      darkMode,
      showBlockMenu,
      blockMenuPosition,
      selectedBlockId,
      toggleSidebar,
      toggleDarkMode,
      showBlockMenuAt,
      hideBlockMenu,
      setSelectedBlock
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
