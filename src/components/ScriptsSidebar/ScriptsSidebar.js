import React, {useState} from 'react';
import s, { container, scriptButtonContainer, divButton } from './ScriptsSidebar.module.css';
import {IoMdPower} from 'react-icons/io';

const ScriptsSidebar = ({ scripts, onSelect, onToggle, loading, selectedScript }) => {
    const [searchText, setSearchText] = useState("");
    if (loading) return <div className={container}>Loading...</div>;
    return (
        <div className={container}>
            <input 
                type="text" 
                placeholder="Search" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <CreateScriptButton
                script={{
                    name: "Create New",
                    new: true,
                    enabled: false,
                    id: 0,
                }}
                onSelect={onSelect}
            />
            {
                scripts.filter(current => current.name.includes(searchText)).map(script =>
                    <ScriptButton
                        key={script.id}
                        script={script}
                        onSelect={onSelect}
                        onToggle={onToggle}
                        selected={selectedScript && selectedScript.id === script.id}
                    />
                )
            }
        </div>
    );
};

const ScriptButton = ({ script, onSelect, onToggle, selected }) => {
    return (
        <div className={scriptButtonContainer}>
            <button className={`${selected ? s.selectedScript : ''}`} style={{ width: "100%" }} onClick={() => onSelect(script)}>{script.name}</button>
            <div className={`${divButton} ${selected ? s.selectedScript : ''}`} onClick={() => onToggle(script)}><IoMdPower color={script.enabled ? "cyan" : "gray"}/></div>
        </div>
    );
};

const CreateScriptButton = ({ script, onSelect }) => {
    return (
        <div className={scriptButtonContainer}>
            <button style={{ width: "100%", background: "#105d59" }} onClick={() => onSelect(script)}>{script.name}</button>
        </div>
    );
};

export default ScriptsSidebar;
