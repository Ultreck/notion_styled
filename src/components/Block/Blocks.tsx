
import React, { useState, useRef, useEffect } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { Block } from '../../types/editorTypes';
import { useUI } from '../../contexts/UIContext';

export type BlockType = {
  id: string;
  type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'bulletList' | 'numberedList' | 'quote' | 'code' | 'image' | 'video';
  content: string;
  order: number;
  pageId: string;
};

const Blocks = ({ block }: { block: BlockType }) => {
  const editor = useEditor();
  const { showBlockMenuAt } = useUI();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(block.content);
  }, [block.content]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(content.length, content.length);
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (content !== block.content) {
      if (editor.updateBlock) {
        editor.updateBlock(block.id, { content });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();

      // Create new block
      const newBlock: BlockType = {
        id: Date.now().toString(),
        type: 'paragraph',
        content: '',
        order: block.order + 1,
        pageId: block.pageId
      };
      if (editor.addBlock) {
        editor.addBlock('paragraph', block.order + 1);
      }
    }
    e.preventDefault();
    // Optionally, trigger the block menu in another way for keyboard events, or remove this line.
    // showBlockMenuAt(e.clientX, e.clientY, block.id); // Removed because clientX/clientY are not available on KeyboardEvent
  };

  const getPlaceholder = () => {
    switch (block.type) {
      case 'heading1': return "Heading 1";
      case 'heading2': return "Heading 2";
      case 'heading3': return "Heading 3";
      case 'bulletList': return "List item";
      case 'numberedList': return "List item";
      case 'quote': return "Empty quote";
      case 'code': return "Code snippet";
      default: return "Type '/' for commands";
    }
  };

  const baseInputClasses = "w-full border-none outline-none bg-transparent font-sans leading-6 text-gray-800 resize-none overflow-hidden";
  const baseContentClasses = "w-full border-none outline-none bg-transparent font-sans leading-6 text-gray-800";

  const renderContent = () => {
    if (isEditing) {
      return (
        <textarea
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${baseInputClasses} min-h-7 p-0 ${getTypeClasses()}`}
          placeholder={getPlaceholder()}
          rows={1}
        />
      );
    }

    const displayContent = content || getPlaceholder();

    switch (block.type) {
      case 'heading1':
        return <h1 className={`${baseContentClasses} text-4xl font-bold my-2 leading-tight`}>{displayContent}</h1>;
      case 'heading2':
        return <h2 className={`${baseContentClasses} text-2xl font-semibold my-1.5 leading-snug`}>{displayContent}</h2>;
      case 'heading3':
        return <h3 className={`${baseContentClasses} text-xl font-semibold my-1 leading-snug`}>{displayContent}</h3>;
      case 'bulletList':
        return <div className={`${baseContentClasses} text-base my-0 pl-0`}>• {displayContent}</div>;
      case 'numberedList':
        return <div className={`${baseContentClasses} text-base my-0 pl-0`}>1. {displayContent}</div>;
      case 'quote':
        return <blockquote className={`${baseContentClasses} text-base border-l-4 border-gray-300 pl-4 italic`}>{displayContent}</blockquote>;
      case 'code':
        return <code className={`${baseContentClasses} text-base font-mono bg-gray-100 px-1 rounded`}>{displayContent}</code>;
      default:
        return <p className={`${baseContentClasses} text-base my-0`}>{displayContent}</p>;
    }
  };

  const getTypeClasses = () => {
    switch (block.type) {
      case 'heading1': return 'text-4xl font-bold my-2 leading-tight';
      case 'heading2': return 'text-2xl font-semibold my-1.5 leading-snug';
      case 'heading3': return 'text-xl font-semibold my-1 leading-snug';
      case 'bulletList':
      case 'numberedList': return 'text-base my-0 pl-0';
      case 'quote': return 'text-base border-l-4 border-gray-300 pl-4 italic';
      case 'code': return 'text-base font-mono bg-gray-100 px-1 rounded';
      default: return 'text-base my-0';
    }
  };

  // Add the missing handleContextMenu function
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showBlockMenuAt) {
      showBlockMenuAt(e.clientX, e.clientY, block.id);
    }
  };

  return (
    <div 
      className={`relative flex mb-0.5 min-h-7 items-start py-0.5 cursor-text transition-all duration-200 hover:bg-black hover:bg-opacity-5 group ${isEditing ? 'editing' : ''} ${!content ? 'empty' : ''}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-grab text-xs text-gray-300 mr-2 mt-0.5 transition-opacity duration-200 hover:text-gray-600">
        ⋮⋮
      </div>
      <div className="flex-1 min-h-7 flex items-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default Blocks;
