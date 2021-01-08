import React from 'react';
import { container, scriptButtonContainer } from './ScriptsSidebar.module.css';

const ScriptsSidebar = ({ scripts, onSelect, onToggle, loading }) => {
    if (loading) return <div className={container}>Loading...</div>;
    return (
        <div className={container}>
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
        <div className={scriptButtonContainer} onClick={() => onSelect(script)}>
            <label>{script.name}</label>
            <button onClick={() => onToggle(script)}>{script.enabled ? "O" : "X"}</button>
        </div>
    );
};

export default ScriptsSidebar;
