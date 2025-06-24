
export interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'video';
  content: string;
  order: number;
  metadata?: {
    imageUrl?: string;
    videoUrl?: string;
    level?: number;
  };
}

export interface EditorState {
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
  | { type: 'REORDER_BLOCKS'; payload: { blocks: Block[] } };

export interface EditorContextType {
  state: EditorState;
  addBlock: (type: Block['type'], index?: number) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  setActiveBlockId: (id: string | null) => void;
}
