
import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block } from '../../types/editorTypes';
import HeadingBlock from './HeadingBlock';
import ParagraphBlock from './ParagraphBlock';
import ImageBlock from './ImageBlock';
import VideoBlock from './VideoBlock';
import BlockControls from './BlockControls';

interface SortableBlockProps {
  block: Block;
}

const SortableBlock: React.FC<SortableBlockProps> = memo(({ block }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'heading':
        return <HeadingBlock block={block} />;
      case 'paragraph':
        return <ParagraphBlock block={block} />;
      case 'image':
        return <ImageBlock block={block} />;
      case 'video':
        return <VideoBlock block={block} />;
      default:
        return <ParagraphBlock block={block} />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start hover:bg-gray-50 rounded-lg transition-colors">
        <div
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-6 h-6 mt-2 mr-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-opacity"
        >
          ⋮⋮
        </div>
        
        <div className="flex-1 min-w-0">
          {renderBlock()}
        </div>
        
        <BlockControls blockId={block.id} />
      </div>
    </div>
  );
});

SortableBlock.displayName = 'SortableBlock';

export default SortableBlock;
