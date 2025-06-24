
import React, { memo, useState } from 'react';
import { useEditorSelector } from '../../contexts/EditorContext';

interface BlockControlsProps {
  blockId: string;
}

const BlockControls: React.FC<BlockControlsProps> = memo(({ blockId }) => {
const deleteBlock: (blockId: string) => void = useEditorSelector((state: EditorState) => state.deleteBlock);

interface EditorState {
    addBlock: (type: 'heading' | 'paragraph' | 'image' | 'video', order: number) => void;
    deleteBlock: (blockId: string) => void;
    state: {
        blocks: Block[];
    };
}

interface Block {
    id: string;
    order: number;
    // add other block properties if needed
}
const addBlock: (type: 'heading' | 'paragraph' | 'image' | 'video', order: number) => void = useEditorSelector((state: EditorState) => state.addBlock);
const blocks: Block[] = useEditorSelector((state: EditorState) => state.state.blocks);
  const [showMenu, setShowMenu] = useState(false);

  const currentBlock = blocks.find(b => b.id === blockId);
  
  const handleDelete = () => {
    deleteBlock(blockId);
    setShowMenu(false);
  };

  const handleAddBelow = (type: 'heading' | 'paragraph' | 'image' | 'video') => {
    if (currentBlock) {
      addBlock(type, currentBlock.order + 1);
    }
    setShowMenu(false);
  };

  return (
    <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors"
        title="Block options"
      >
        •••
      </button>
      
      {showMenu && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-48">
          <div className="px-3 py-1 text-xs font-medium text-gray-500 border-b border-gray-100">
            Add below
          </div>
          <button
            onClick={() => handleAddBelow('paragraph')}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <span>📄</span> Text
          </button>
          <button
            onClick={() => handleAddBelow('heading')}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <span>📝</span> Heading
          </button>
          <button
            onClick={() => handleAddBelow('image')}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <span>🖼️</span> Image
          </button>
          <button
            onClick={() => handleAddBelow('video')}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <span>🎥</span> Video
          </button>
          <div className="border-t border-gray-100 mt-1 pt-1">
            <button
              onClick={handleDelete}
              className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
            >
              <span>🗑️</span> Delete
            </button>
          </div>
        </div>
      )}
      
      {showMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
});

BlockControls.displayName = 'BlockControls';

export default BlockControls;
