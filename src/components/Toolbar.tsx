
import React from 'react';
import { useEditor } from '../contexts/EditorContext';
import { Block } from '../types/EditorTypes';

const Toolbar: React.FC = () => {
  const { addBlock } = useEditor();

  const handleAddBlock = (type: Block['type']) => {
    addBlock(type);
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-900">Add Block:</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleAddBlock('heading')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Heading
          </button>
          <button
            onClick={() => handleAddBlock('paragraph')}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Paragraph
          </button>
          <button
            onClick={() => handleAddBlock('image')}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            Image
          </button>
          <button
            onClick={() => handleAddBlock('video')}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
