
import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { useEditorSelector } from '../../contexts/EditorContext';
import { Block } from '../../types/EditorTypes';

interface HeadingBlockProps {
  block: Block;
}

const HeadingBlock: React.FC<HeadingBlockProps> = memo(({ block }) => {
const updateBlock: (id: string, changes: Partial<Block>) => void = useEditorSelector(
    (state: { updateBlock: (id: string, changes: Partial<Block>) => void }) => state.updateBlock
);
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
    }
    if (e.key === 'Escape') {
      setContent(block.content);
      setIsEditing(false);
    }
  }, [handleSave, block.content]);

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
        className="w-full text-2xl font-bold text-gray-900 bg-transparent border-none outline-none resize-none overflow-hidden p-2 -m-2"
        placeholder="Heading"
        rows={1}
        style={{ minHeight: '2.5rem' }}
      />
    );
  }

  return (
    <h2
      onClick={handleClick}
      className={`text-2xl font-bold text-gray-900 cursor-text p-2 -m-2 rounded hover:bg-gray-50 transition-colors ${
        !content ? 'text-gray-400' : ''
      }`}
    >
      {content || 'Heading'}
    </h2>
  );
});

HeadingBlock.displayName = 'HeadingBlock';

export default HeadingBlock;
