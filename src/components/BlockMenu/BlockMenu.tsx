
import React from 'react';
import { useEditor, Block } from '../../contexts/EditorContext';
import { useUI } from '../../contexts/UIContext';
import './BlockMenu.css';

interface BlockType {
  type: Block['type'];
  label: string;
  icon: string;
  description: string;
}

const blockTypes: BlockType[] = [
  { type: 'paragraph', label: 'Text', icon: '📝', description: 'Just start writing with plain text.' },
  { type: 'heading1', label: 'Heading 1', icon: 'H1', description: 'Big section heading.' },
  { type: 'heading2', label: 'Heading 2', icon: 'H2', description: 'Medium section heading.' },
  { type: 'heading3', label: 'Heading 3', icon: 'H3', description: 'Small section heading.' },
  { type: 'bulletList', label: 'Bulleted list', icon: '•', description: 'Create a simple bulleted list.' },
  { type: 'numberedList', label: 'Numbered list', icon: '1.', description: 'Create a list with numbering.' },
  { type: 'quote', label: 'Quote', icon: '❝', description: 'Capture a quote.' },
  { type: 'code', label: 'Code', icon: '{ }', description: 'Capture a code snippet.' },
];

const BlockMenu: React.FC = () => {
  const { dispatch } = useEditor();
  const { showBlockMenu, blockMenuPosition, hideBlockMenu, selectedBlockId } = useUI();

  if (!showBlockMenu || !blockMenuPosition || !selectedBlockId) return null;

  const handleBlockTypeSelect = (type: Block['type']) => {
    dispatch({
      type: 'CHANGE_BLOCK_TYPE',
      payload: { id: selectedBlockId, newType: type }
    });
    hideBlockMenu();
  };

  return (
    <div 
      className="block-menu"
      style={{
        left: blockMenuPosition.x,
        top: blockMenuPosition.y
      }}
    >
      <div className="block-menu-header">
        <span>Turn into</span>
      </div>
      <div className="block-menu-items">
        {blockTypes.map((blockType) => (
          <div
            key={blockType.type}
            className="block-menu-item"
            onClick={() => handleBlockTypeSelect(blockType.type)}
          >
            <span className="block-menu-icon">{blockType.icon}</span>
            <div className="block-menu-content">
              <div className="block-menu-label">{blockType.label}</div>
              <div className="block-menu-description">{blockType.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockMenu;
