/*global chrome*/
import {app} from './App.module.css';
import {useState, useEffect} from 'react';
import ScriptsSidebar from './components/ScriptsSidebar'
import CodeEditor from './components/CodeEditor'
import {nanoid} from 'nanoid'

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
    if(chrome.storage){
      chrome.storage.sync.get((data)=>{
        setScripts(data["scripts"] || [])
        setLoading(false)
      })
    } else {
      console.log("Extension chrome storage isn't available.")
    }

  }, [])

  const onSelect = script => {
    // TODO: check if script is edited, if it is, prompt to save the changes
    // then set selected script
    console.log("on select", script)
    setSelectedScript(script);
  }

  const onSave = script => {
    // check if scripts already containing a script with the same ID, if it does, override it,
    // otherwise push it. And set "new" attribute to false. and update the chrome store
    console.log("on Save")
    let updatedScripts = []
    if(!script.new){
      const scriptIndex = scripts.findIndex(s => s.id === script.id)
      updatedScripts =[
        ...scripts.slice(0, scriptIndex),
        script,
        ...scripts.slice(scriptIndex+1, scripts.length)
      ]
    } else {
      updatedScripts = [
        {
          ...script,
          new: false,
          id: nanoid()
        },
        ...scripts
      ]
    }
    if(chrome.storage){
      chrome.storage.sync.get((data)=>{
        const updatedStorage = {
          ...data,
          scripts: updatedScripts
        }
        chrome.storage.sync.set(updatedStorage, function() {
          console.log('Storage updated.');
        });
      })
      
    } else {
      console.warn("Cannot save to the persistance storage since the extension isn't running as an extension.")
    }
    setScripts(updatedScripts)
    
  }

  const onToggle = script => {
    // Toggle enabled and update the chrome store
    console.log("on Toggle")
    const updatedScript = {
      ...script,
      enabled: !script.enabled
    }
    onSave(updatedScript)
  }

  return (
    <div className={app}>
      <ScriptsSidebar scripts={scripts} onSelect={onSelect} onToggle={onToggle} loading={loading} />
      <CodeEditor onSave={onSave} script={selectedScript}/>
    </div>
  );
}

export default App;
