import React from 'react';
import { TreeProvider } from "./context/TreeContext";
import { TreeView } from "./components/Tree";
import './App.css';

function App() {
  return (
    <TreeProvider>
      <div className="App">
        <h1>Tree View</h1>
        <div className="view">
          <div className="treeView">
            <TreeView />
          </div>
          <div className="details"></div>
        </div>
      </div>
    </TreeProvider>
  );
}

export default App;
