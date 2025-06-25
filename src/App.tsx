import { EditorProvider } from "./contexts/EditorContext";
import { UIProvider } from "./contexts/UIContext";
import Editor from "./components/Editor/Editor";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <EditorProvider>
      <UIProvider>
        <div className="min-h-screen relative">
          <div className="flex min-h-screen w-full">
            <div className=" w-60 left-0 h-screen">
              <Sidebar />
            </div>
            <div className="flex-1 w-3/4 flex flex-col relative">
              <Toolbar />
              <Editor />
            </div>
          </div>
        </div>
      </UIProvider>
    </EditorProvider>
  );
}

export default App;
