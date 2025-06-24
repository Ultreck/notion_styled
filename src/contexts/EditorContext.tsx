
import React, { createContext, useContext, useReducer, ReactNode, useMemo, useCallback } from 'react';
import { Block, EditorState, EditorAction, EditorContextType } from '../types/EditorTypes';

const initialState: EditorState = {
  blocks: [
    {
      id: '1',
      type: 'paragraph',
      content: 'Welcome to your Notion-style editor for pharmacy students!',
      order: 0
    }
  ],
  activeBlockId: null,
  isLoading: false
};

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const newBlocks = [...state.blocks];
      const insertIndex = action.payload.index ?? newBlocks.length;
      
      newBlocks.splice(insertIndex, 0, {
        ...action.payload.block,
        order: insertIndex
      });
      
      // Update order for subsequent blocks
      newBlocks.forEach((block, index) => {
        block.order = index;
      });
      
      return { ...state, blocks: newBlocks };
    }
      
    case 'UPDATE_BLOCK':
      return {
        ...state,
        blocks: state.blocks.map(block =>
          block.id === action.payload.id
            ? { ...block, ...action.payload.updates }
            : block
        )
      };
      
    case 'DELETE_BLOCK': {
      const filteredBlocks = state.blocks.filter(block => block.id !== action.payload.id);
      // Update order after deletion
      filteredBlocks.forEach((block, index) => {
        block.order = index;
      });
      return {
        ...state,
        blocks: filteredBlocks,
        activeBlockId: state.activeBlockId === action.payload.id ? null : state.activeBlockId
      };
    }
      
    case 'MOVE_BLOCK': {
      const newBlocks = [...state.blocks];
      const [movedBlock] = newBlocks.splice(action.payload.fromIndex, 1);
      newBlocks.splice(action.payload.toIndex, 0, movedBlock);
      
      // Update order
      newBlocks.forEach((block, index) => {
        block.order = index;
      });
      
      return { ...state, blocks: newBlocks };
    }
      
    case 'SET_ACTIVE_BLOCK':
      return { ...state, activeBlockId: action.payload.id };
      
    case 'REORDER_BLOCKS':
      return { ...state, blocks: action.payload.blocks };
      
    default:
      return state;
  }
};

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  
  const addBlock = useCallback((type: Block['type'], index?: number) => {
    const newBlock: Block = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      order: index ?? state.blocks.length,
      metadata: {}
    };
    
    dispatch({
      type: 'ADD_BLOCK',
      payload: { block: newBlock, index }
    });
  }, [state.blocks.length]);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    dispatch({
      type: 'UPDATE_BLOCK',
      payload: { id, updates }
    });
  }, []);

  const deleteBlock = useCallback((id: string) => {
    dispatch({
      type: 'DELETE_BLOCK',
      payload: { id }
    });
  }, []);

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({
      type: 'MOVE_BLOCK',
      payload: { fromIndex, toIndex }
    });
  }, []);

  const setActiveBlockId = useCallback((id: string | null) => {
    dispatch({
      type: 'SET_ACTIVE_BLOCK',
      payload: { id }
    });
  }, []);

  const contextValue = useMemo(() => ({
    state,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    setActiveBlockId
  }), [state, addBlock, updateBlock, deleteBlock, moveBlock, setActiveBlockId]);

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

// Regular hook
export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

// Optimized selector hook
export const useEditorSelector = <T,>(selector: (state: EditorContextType) => T): T => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorSelector must be used within an EditorProvider');
  }
  
  return useMemo(() => selector(context), [selector, context]);
};
