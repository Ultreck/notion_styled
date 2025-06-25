
import React, { memo, useState, useCallback } from 'react';
import { useEditorSelector } from '../../contexts//EditorContext';
import { Block } from '../../types/editorTypes';

interface ImageBlockProps {
  block: Block;
}

const ImageBlock: React.FC<ImageBlockProps> = memo(({ block }) => {
const updateBlock: (id: string, updates: Partial<Block>) => void = useEditorSelector(
    (state: { updateBlock: (id: string, updates: Partial<Block>) => void }) => state.updateBlock
);
  const [isEditing, setIsEditing] = useState(!block.metadata?.imageUrl);
  const [imageUrl, setImageUrl] = useState(block.metadata?.imageUrl || '');
  const [imageError, setImageError] = useState(false);

  const handleSave = useCallback(() => {
    if (imageUrl.trim()) {
      updateBlock(block.id, {
        metadata: { ...block.metadata, imageUrl: imageUrl.trim() }
      });
      setIsEditing(false);
      setImageError(false);
    }
  }, [block.id, block.metadata, updateBlock, imageUrl]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setImageUrl(block.metadata?.imageUrl || '');
    }
  }, [handleSave, block.metadata?.imageUrl]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageError(false);
  }, []);

  if (isEditing) {
    return (
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🖼️</span>
          <span className="font-medium text-gray-700">Image</span>
        </div>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          placeholder="Paste image URL here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Add Image
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setImageUrl(block.metadata?.imageUrl || '');
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (!block.metadata?.imageUrl) {
    return (
      <div 
        className="p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors text-center"
        onClick={() => setIsEditing(true)}
      >
        <div className="text-4xl mb-2">🖼️</div>
        <p className="text-gray-600">Click to add an image</p>
        <p className="text-sm text-gray-400">Paste any image URL</p>
      </div>
    );
  }

  if (imageError) {
    return (
      <div className="p-4 border border-red-300 rounded-lg bg-red-50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500">⚠️</span>
          <span className="text-red-700 font-medium">Failed to load image</span>
        </div>
        <p className="text-sm text-red-600 mb-3">The image URL might be invalid or inaccessible.</p>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
        >
          Update URL
        </button>
      </div>
    );
  }

  return (
    <div className="my-4">
      <img
        src={block.metadata.imageUrl}
        alt="Content"
        onError={handleImageError}
        onLoad={handleImageLoad}
        className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
      />
      <button
        onClick={() => setIsEditing(true)}
        className="mt-2 text-sm text-blue-500 hover:text-blue-700 transition-colors"
      >
        Change image URL
      </button>
    </div>
  );
});

ImageBlock.displayName = 'ImageBlock';

export default ImageBlock;
