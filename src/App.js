import {app} from './App.module.css';
import {useState, useEffect} from 'react';

const app = () =>{
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScript, setSelectedScript] = useState({new: true});
  useEffect(()=>{
    // Load the scripts from the chrome store
  }, [])

  const onSelect = script => {
    // check if script is edited, if it is, prompt to save the changes
    // then set selected script
  }

  const onSave = script => {
    // check if scripts already containing a script with the same ID, if it does, override it,
    // otherwise push it. And set "new" attribute to false. and update the chrome store
  }

  const onEnable = script => {
    // set enabled to true and update the chrome store
  }

  return (
    <div className={app}>
      <ScriptsSidebar scripts={scripts} onSelect={onSelect} onEnable={onEnable} loading={loading} />
      <CodeEditor onSave={onSave} selectedScript={selectedScript}/>
    </div>
  );
}

export default App;
