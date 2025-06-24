export interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'video';
  content: string;
  order: number;
  pageId: string;
  metadata?: {
    imageUrl?: string;
    videoUrl?: string;
    level?: number;
  };
}

export interface Page {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditorState {
  pages: Page[];
  currentPageId: string | null;
  blocks: Block[];
  activeBlockId: string | null;
  isLoading: boolean;
}

export type EditorAction =
  | { type: 'ADD_BLOCK'; payload: { block: Block; index?: number } }
  | { type: 'UPDATE_BLOCK'; payload: { id: string; updates: Partial<Block> } }
  | { type: 'DELETE_BLOCK'; payload: { id: string } }
  | { type: 'MOVE_BLOCK'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'SET_ACTIVE_BLOCK'; payload: { id: string | null } }
  | { type: 'REORDER_BLOCKS'; payload: { blocks: Block[] } }
  | { type: 'ADD_PAGE'; payload: { page: Page } }
  | { type: 'UPDATE_PAGE'; payload: { id: string; updates: Partial<Page> } }
  | { type: 'DELETE_PAGE'; payload: { id: string } }
  | { type: 'SET_CURRENT_PAGE'; payload: { pageId: string } };

export interface EditorContextType {
  state: EditorState;
  addBlock: (type: Block['type'], index?: number) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  setActiveBlockId: (id: string | null) => void;
  addPage: (title?: string) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  setCurrentPage: (pageId: string) => void;
  getCurrentPageBlocks: () => Block[];
}