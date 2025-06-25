
import React from 'react';
import { useEditor } from '../contexts/EditorContext';
import { useUI } from '../contexts/UIContext';
import { Block } from '../types/editorTypes';

const Toolbar: React.FC = () => {
  const { addBlock } = useEditor();
  const { toggleSidebar } = useUI();

  const handleAddBlock = (type: Block['type']) => {
    addBlock(type);
  };

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          ☰ Pages
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <button
          onClick={() => handleAddBlock('heading')}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          H1 Heading
        </button>
        
        <button
          onClick={() => handleAddBlock('paragraph')}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          📝 Text
        </button>
        
        <button
          onClick={() => handleAddBlock('image')}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          🖼️ Image
        </button>
        
        <button
          onClick={() => handleAddBlock('video')}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          🎥 Video
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
