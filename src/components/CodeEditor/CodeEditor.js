import {useState, useEffect} from 'react';
import { container, editor, metadataContainer } from './CodeEditor.module.css';

const ScriptsSidebar = ({ script, onSave }) => {
    const [code, setCode] = useState("")

    useEffect(() => {
        setCode(script.code)
    }, [script])

    const onSaveClick = (name, description, urlMatch) => {
        onSave({
            ...script,
            name,
            description,
            urlMatch, 
            code
        })
    }
    return (
        <div className={container}>
            <textarea className={editor} value={code} onChange={e => setCode(e.target.value)}></textarea>
            <Metadata script={script} onSave={onSaveClick}/>
        </div>
    );
};

const Metadata = ({script, onSave}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [urlMatch, setUrlMatch] = useState("")
    useEffect(() => {
        if(!script.new){
            setName(script.name)
            setDescription(script.description)
            setUrlMatch(script.urlMatch)
        }
    }, [script])

    return (
        <div className={metadataContainer}>
            <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}></input>
            <input type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}></input>
            <input type="text" placeholder="Url Matches" value={urlMatch} onChange={e=>setUrlMatch(e.target.value)}></input>
            <input type="text" placeholder="Interval (coming soon)" disabled></input>
            <button onClick={() => onSave(name, description, urlMatch)}>Save</button>
        </div>
    );
};

export default ScriptsSidebar;
