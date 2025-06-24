
import React from 'react';
import { EditorProvider } from './contexts/EditorContext';
import Editor from './components/Editor/Editor';
import Toolbar from './components/Toolbar'

function App() {
  return (
    <EditorProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Toolbar />
          <Editor />
        </div>
      </div>
    </EditorProvider>
  );
}

export default App;
