
import React from 'react';
import { EditorProvider } from './contexts/EditorContext';
import { UIProvider } from './contexts/UIContext';
import Editor from './components/Editor/Editor';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <EditorProvider>
      <UIProvider>
        <div className="h-screen overflow-hidden">
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Toolbar />
              <Editor />
            </div>
          </div>
        </div>
      </UIProvider>
    </EditorProvider>
  );
}

export default App;