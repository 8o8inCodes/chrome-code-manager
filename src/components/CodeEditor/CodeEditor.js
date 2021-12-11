import { useState, useEffect } from "react";
import AceEditor from "react-ace";
import {
  container,
  metadataContainer,
  buttonsContainer,
  button,
} from "./CodeEditor.module.css";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

const ScriptsSidebar = ({ script, onSave, onDelete }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (script.new) {
      setCode('console.log("New Script")');
    } else {
      setCode(script.code);
    }
  }, [script]);

  const onSaveClick = (
    name,
    description,
    urlMatch,
    waitForElement,
    scriptInterval
  ) => {
    onSave({
      ...script,
      name,
      description,
      urlMatch,
      waitForElement,
      scriptInterval,
      code,
    });
  };
  return (
    <div className={container}>
      <AceEditor
        placeholder="Code"
        mode="javascript"
        theme="monokai"
        onChange={setCode}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        height="385px"
        width="100%"
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />

      <Metadata script={script} onSave={onSaveClick} onDelete={onDelete} />
    </div>
  );
};

const Metadata = ({ script, onSave, onDelete }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [urlMatch, setUrlMatch] = useState("");
  const [waitForElement, setWaitForElement] = useState("");
  const [scriptInterval, setScriptInterval] = useState(null);

  useEffect(() => {
    if (!script.new) {
      setName(script.name);
      setDescription(script.description);
      setUrlMatch(script.urlMatch);
      setWaitForElement(script.waitForElement);
      setScriptInterval(script.scriptInterval);
    } else {
      setName("");
      setDescription("");
      setUrlMatch("");
      setWaitForElement("");
      setScriptInterval(null);
    }
  }, [script]);

  return (
    <div className={metadataContainer}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Url Matches"
        value={urlMatch}
        onChange={(e) => setUrlMatch(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Wait for Element"
        value={waitForElement}
        onChange={(e) => setWaitForElement(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Interval (0 or empty for no interval)"
        value={scriptInterval}
        onChange={(e) => setScriptInterval(e.target.value)}
      ></input>
      <div className={buttonsContainer}>
        <button
          className={button}
          disabled={script.new}
          onClick={() => onDelete(script)}
        >
          Delete
        </button>
        <button
          className={button}
          onClick={() =>
            onSave(name, description, urlMatch, waitForElement, scriptInterval)
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ScriptsSidebar;
