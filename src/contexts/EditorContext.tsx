

import React, { createContext, useContext, useReducer, ReactNode, useMemo, useCallback } from 'react';
import { Block, Page, EditorState, EditorAction, EditorContextType } from '../types/EditorTypes';

const defaultPageId = 'default-page-1';

const initialState: EditorState = {
  pages: [
    {
      id: defaultPageId,
      title: 'Untitled',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  currentPageId: defaultPageId,
  blocks: [
    {
      id: '1',
      type: 'paragraph',
      content: 'Welcome to your Notion-style editor for pharmacy students!',
      order: 0,
      pageId: defaultPageId
    }
  ],
  activeBlockId: null,
  isLoading: false
};

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const currentPageBlocks = state.blocks.filter(block => block.pageId === state.currentPageId);
      const newBlocks = [...state.blocks];
      const insertIndex = action.payload.index ?? currentPageBlocks.length;
      
      const newBlock = {
        ...action.payload.block,
        order: insertIndex,
        pageId: state.currentPageId || state.pages[0]?.id || 'default'
      };
      
      // Find the position in the full blocks array
      const currentPageBlocksInOrder = currentPageBlocks.sort((a, b) => a.order - b.order);
      let insertPosition = newBlocks.length;
      
      if (insertIndex < currentPageBlocksInOrder.length) {
        const targetBlock = currentPageBlocksInOrder[insertIndex];
        insertPosition = newBlocks.findIndex(block => block.id === targetBlock.id);
      }
      
      newBlocks.splice(insertPosition, 0, newBlock);
      
      // Update order for blocks in current page
      const updatedBlocks = newBlocks.map(block => {
        if (block.pageId === state.currentPageId) {
          const pageBlocks = newBlocks.filter(b => b.pageId === state.currentPageId);
          const index = pageBlocks.indexOf(block);
          return { ...block, order: index };
        }
        return block;
      });
      
      return { ...state, blocks: updatedBlocks };
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
      // Update order for blocks in current page
      const updatedBlocks = filteredBlocks.map(block => {
        if (block.pageId === state.currentPageId) {
          const pageBlocks = filteredBlocks.filter(b => b.pageId === state.currentPageId);
          const index = pageBlocks.indexOf(block);
          return { ...block, order: index };
        }
        return block;
      });
      
      return {
        ...state,
        blocks: updatedBlocks,
        activeBlockId: state.activeBlockId === action.payload.id ? null : state.activeBlockId
      };
    }
      
    case 'MOVE_BLOCK': {
      const currentPageBlocks = state.blocks.filter(block => block.pageId === state.currentPageId);
      const otherBlocks = state.blocks.filter(block => block.pageId !== state.currentPageId);
      
      const [movedBlock] = currentPageBlocks.splice(action.payload.fromIndex, 1);
      currentPageBlocks.splice(action.payload.toIndex, 0, movedBlock);
      
      // Update order for current page blocks
      currentPageBlocks.forEach((block, index) => {
        block.order = index;
      });
      
      return { ...state, blocks: [...otherBlocks, ...currentPageBlocks] };
    }
      
    case 'SET_ACTIVE_BLOCK':
      return { ...state, activeBlockId: action.payload.id };
      
    case 'REORDER_BLOCKS':
      return { ...state, blocks: action.payload.blocks };

    case 'ADD_PAGE':
      return {
        ...state,
        pages: [...state.pages, action.payload.page]
      };

    case 'UPDATE_PAGE':
      return {
        ...state,
        pages: state.pages.map(page =>
          page.id === action.payload.id
            ? { ...page, ...action.payload.updates, updatedAt: new Date() }
            : page
        )
      };

    case 'DELETE_PAGE': {
      const filteredPages = state.pages.filter(page => page.id !== action.payload.id);
      const filteredBlocks = state.blocks.filter(block => block.pageId !== action.payload.id);
      const newCurrentPageId = state.currentPageId === action.payload.id 
        ? (filteredPages[0]?.id || null) 
        : state.currentPageId;
      
      return {
        ...state,
        pages: filteredPages,
        blocks: filteredBlocks,
        currentPageId: newCurrentPageId
      };
    }

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPageId: action.payload.pageId,
        activeBlockId: null
      };
      
    default:
      return state;
  }
};

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  
  const addBlock = useCallback((type: Block['type'], index?: number) => {
    if (!state.currentPageId) return;
    
    const currentPageBlocks = state.blocks.filter(block => block.pageId === state.currentPageId);
    const newBlock: Block = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      order: index ?? currentPageBlocks.length,
      pageId: state.currentPageId,
      metadata: {}
    };
    
    dispatch({
      type: 'ADD_BLOCK',
      payload: { block: newBlock, index }
    });
  }, [state.currentPageId, state.blocks]);

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

  const addPage = useCallback((title: string = 'Untitled') => {
    const newPage: Page = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    dispatch({
      type: 'ADD_PAGE',
      payload: { page: newPage }
    });
    
    // Switch to the new page
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: { pageId: newPage.id }
    });
  }, []);

  const updatePage = useCallback((id: string, updates: Partial<Page>) => {
    dispatch({
      type: 'UPDATE_PAGE',
      payload: { id, updates }
    });
  }, []);

  const deletePage = useCallback((id: string) => {
    if (state.pages.length <= 1) return; // Don't delete the last page
    
    dispatch({
      type: 'DELETE_PAGE',
      payload: { id }
    });
  }, [state.pages.length]);

  const setCurrentPage = useCallback((pageId: string) => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: { pageId }
    });
  }, []);

  const getCurrentPageBlocks = useCallback(() => {
    if (!state.currentPageId) return [];
    return state.blocks
      .filter(block => block.pageId === state.currentPageId)
      .sort((a, b) => a.order - b.order);
  }, [state.blocks, state.currentPageId]);

  const contextValue = useMemo(() => ({
    state,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    setActiveBlockId,
    addPage,
    updatePage,
    deletePage,
    setCurrentPage,
    getCurrentPageBlocks
  }), [state, addBlock, updateBlock, deleteBlock, moveBlock, setActiveBlockId, addPage, updatePage, deletePage, setCurrentPage, getCurrentPageBlocks]);

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
