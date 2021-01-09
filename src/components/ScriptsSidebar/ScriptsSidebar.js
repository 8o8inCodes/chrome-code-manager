import React from 'react';
import { container, scriptButtonContainer, divButton } from './ScriptsSidebar.module.css';
import {IoMdPower} from 'react-icons/io';

const ScriptsSidebar = ({ scripts, onSelect, onToggle, loading }) => {
    if (loading) return <div className={container}>Loading...</div>;
    return (
        <div className={container}>
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
                scripts.map(script =>
                    <ScriptButton
                        key={script.id}
                        script={script}
                        onSelect={onSelect}
                        onToggle={onToggle}
                    />
                )
            }
        </div>
    );
};

const ScriptButton = ({ script, onSelect, onToggle }) => {
    return (
        <div className={scriptButtonContainer}>
            <button style={{ width: "100%" }} onClick={() => onSelect(script)}>{script.name}</button>
            <div className={divButton} onClick={() => onToggle(script)}><IoMdPower color={script.enabled ? "cyan" : "gray"}/></div>
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
