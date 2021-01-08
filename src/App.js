import {app} from './App.module.css';
import {useState, useEffect} from 'react';
import ScriptsSidebar from './components/ScriptsSidebar'
import CodeEditor from './components/CodeEditor'

const mockScript = [
  {
    name: "test-script",
    description: "should be deleted",
    urlMatch: "*",
    enabled: false,
    code: `console.log("test script")`,
    id: "abc897987"
  },
  {
    name: "test-script-2",
    description: "should be deleted",
    urlMatch: "*",
    enabled: false,
    code: `console.log("test script 2")`,
    id: "abc89798731"
  }
]

const App = () =>{
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScript, setSelectedScript] = useState({new: true});
  useEffect(()=>{
    // Load the scripts from the chrome store
    setScripts(mockScript)
    setLoading(false)
  }, [])

  const onSelect = script => {
    // TODO: check if script is edited, if it is, prompt to save the changes
    // then set selected script
  }

  const onSave = script => {
    // check if scripts already containing a script with the same ID, if it does, override it,
    // otherwise push it. And set "new" attribute to false. and update the chrome store
  }

  const onToggle = script => {
    // Toggle enabled and update the chrome store
  }

  return (
    <div className={app}>
      <ScriptsSidebar scripts={scripts} onSelect={onSelect} onToggle={onToggle} loading={loading} />
      <CodeEditor onSave={onSave} script={selectedScript}/>
    </div>
  );
}

export default App;
