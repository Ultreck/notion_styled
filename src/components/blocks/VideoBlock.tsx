
import React, { memo, useState, useCallback } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useEditorSelector } from '../../contexts/EditorContext';
import { Block } from '../../types/EditorTypes';

interface VideoBlockProps {
  block: Block;
}

const VideoBlock: React.FC<VideoBlockProps> = memo(({ block }) => {
  const updateBlock = useEditorSelector(state => state.updateBlock);
  const [isEditing, setIsEditing] = useState(!block.metadata?.videoUrl);
  const [videoUrl, setVideoUrl] = useState(block.metadata?.videoUrl || '');

  const handleSave = useCallback(() => {
    if (videoUrl.trim()) {
      updateBlock(block.id, {
        metadata: { ...block.metadata, videoUrl: videoUrl.trim() }
      });
      setIsEditing(false);
    }
  }, [block.id, block.metadata, updateBlock, videoUrl]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setVideoUrl(block.metadata?.videoUrl || '');
    }
  }, [handleSave, block.metadata?.videoUrl]);

  if (isEditing) {
    return (
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎥</span>
          <span className="font-medium text-gray-700">YouTube Video</span>
        </div>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          placeholder="Paste YouTube URL here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            Embed Video
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setVideoUrl(block.metadata?.videoUrl || '');
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (!block.metadata?.videoUrl) {
    return (
      <div 
        className="p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors text-center"
        onClick={() => setIsEditing(true)}
      >
        <div className="text-4xl mb-2">🎥</div>
        <p className="text-gray-600">Click to add a YouTube video</p>
        <p className="text-sm text-gray-400">Paste any YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <div className="absolute inset-0">
          <ReactPlayer
            url={block.metadata.videoUrl}
            width="100%"
            height="100%"
            controls={true}
            onError={(error) => {
              console.error('Video playback error:', error);
            }}
          />
        </div>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="mt-2 text-sm text-blue-500 hover:text-blue-700 transition-colors"
      >
        Change video URL
      </button>
    </div>
  );
});

VideoBlock.displayName = 'VideoBlock';

export default VideoBlock;
