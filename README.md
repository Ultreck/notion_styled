
# Notion-Style Editor for Pharmacy Students

A feature-rich, Notion-inspired block-based editor built specifically for pharmacy students using React, TypeScript, and Context API.

## Features

### 📝 Block-Based Editing
- **Multiple Block Types**: Paragraphs, headings (H1, H2, H3), images, videos, quotes, code blocks, and lists
- **Drag & Drop**: Reorder blocks with intuitive drag-and-drop functionality
- **Block Menu**: Transform any block into a different type using the block menu
- **Inline Editing**: Click any block to edit content directly

### 📄 Multi-Page Support
- **Page Management**: Create unlimited pages for organizing different topics
- **Sidebar Navigation**: Easy page switching with a collapsible sidebar
- **Page Operations**: Rename and delete pages (with protection against deleting the last page)

### 🎨 User Interface
- **Clean Design**: Minimal, distraction-free interface optimized for note-taking
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Keyboard Shortcuts**: Efficient navigation and editing with keyboard support

## Tech Stack

- **React 18** with TypeScript
- **Context API** for state management
- **DND Kit** for drag-and-drop functionality
- **Tailwind CSS** for styling
- **Vite** for fast development and building

## Getting Started

### Prerequisites
- Node.js (latest stable version)
- npm or yarn

### Installation & Running
1. Hit the **Run** button in Replit
2. The development server will start automatically
3. Edit any file and watch it live update!

### Development
- Main editor component: `src/components/Editor/Editor.tsx`
- Block components: `src/components/blocks/`
- State management: `src/contexts/EditorContext.tsx`
- Type definitions: `src/types/editorTypes.ts`

## Usage

### Creating Pages
1. Click the sidebar toggle in the header
2. Click "New Page" to create a blank page
3. Switch between pages by clicking on them in the sidebar

### Working with Blocks
1. Click any block to start editing
2. Press Enter to create a new paragraph block
3. Use the block menu (appears when you select a block) to change block types
4. Drag blocks to reorder them

### Block Types Available
- **Text**: Plain paragraph text
- **Headings**: H1, H2, H3 for structure
- **Lists**: Bulleted and numbered lists
- **Media**: Images and videos
- **Code**: Code snippets with syntax highlighting
- **Quotes**: Highlighted quote blocks

## Project Structure

```
src/
├── components/
│   ├── blocks/          # Individual block components
│   ├── BlockMenu/       # Block type selector
│   ├── Editor/          # Main editor component
│   ├── Header/          # Top navigation
│   └── Sidebar/         # Page navigation
├── contexts/
│   ├── EditorContext.tsx # Main state management
│   └── UIContext.tsx     # UI state (sidebar, menus)
└── types/
    └── editorTypes.ts    # TypeScript definitions
```

## Deployment

This project is configured for Replit deployment. The production build can be deployed directly from the Replit interface.

---

Perfect for pharmacy students who need a powerful, organized way to take notes, create study guides, and manage their coursework across multiple subjects and topics.