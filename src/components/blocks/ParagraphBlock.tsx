
import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { useEditorSelector } from '../../contexts/EditorContext';
import { Block } from '../../types/editorTypes';

interface ParagraphBlockProps {
  block: Block;
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = memo(({ block }) => {
  const updateBlock = useEditorSelector(state => state.updateBlock);
  const addBlock = useEditorSelector(state => state.addBlock);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(block.content);
  }, [block.content]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(content.length, content.length);
    }
  }, [isEditing, content.length]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    if (content !== block.content) {
      updateBlock(block.id, { content });
    }
  }, [block.content, block.id, content, updateBlock]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
      addBlock('paragraph', block.order + 1);
    }
    if (e.key === 'Escape') {
      setContent(block.content);
      setIsEditing(false);
    }
  }, [handleSave, addBlock, block.order, block.content]);

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-full text-base text-gray-700 bg-transparent border-none outline-none resize-none overflow-hidden p-2 -m-2"
        placeholder="Type '/' for commands"
        rows={1}
        style={{ minHeight: '1.5rem' }}
      />
    );
  }

  return (
    <p
      onClick={handleClick}
      className={`text-base text-gray-700 cursor-text p-2 -m-2 rounded hover:bg-gray-50 transition-colors ${
        !content ? 'text-gray-400' : ''
      }`}
    >
      {content || "Type '/' for commands"}
    </p>
  );
});

ParagraphBlock.displayName = 'ParagraphBlock';

export default ParagraphBlock;
