import { useState, useEffect } from "react";
import AceEditor from "react-ace";
import {
	container,
	metadataContainer,
	buttonsContainer,
	button,
} from "./CodeEditor.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

const ScriptsSidebar = ({ script, onSave, onDelete }) => {
	const [code, setCode] = useState("");

	const [metadataDrawerOpen, setMetadataDrawerOpen] = useState(false);
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
		<Box sx={{ height: "564px", width: "100%" }}>
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
				height="100%"
				width="100%"
				setOptions={{
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: false,
					enableSnippets: false,
					showLineNumbers: true,
					tabSize: 2,
				}}
			/>
			<Box component="span" sx={{ p: 2 }}>
				<Button onClick={() => setMetadataDrawerOpen(true)}>
					Script Settings
				</Button>
			</Box>
			<Box component="span" sx={{ p: 2 }}>
				<Button
					variant="contained"
					size="small"
					disabled={script.new}
					onClick={() => onDelete(script)}
				>
					Delete
				</Button>
			</Box>
			<Box component="span" sx={{ p: 2 }}>
				<Button
					variant="contained"
					size="small"
					onClick={() =>
						onSaveClick(
							name,
							description,
							urlMatch,
							waitForElement,
							scriptInterval
						)
					}
				>
					Save
				</Button>
			</Box>
			<Drawer
				anchor="bottom"
				open={metadataDrawerOpen}
				onClose={() => setMetadataDrawerOpen(false)}
			>
				<Box sx={{ p: 2 }}>
					<Box sx={{ width: "100%" }}>
						<TextField
							label="Name"
							variant="filled"
							size="small"
							value={name}
							onChange={(e) => setName(e.target.value)}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Description"
							variant="filled"
							size="small"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Url Match"
							variant="filled"
							size="small"
							value={urlMatch}
							onChange={(e) => setUrlMatch(e.target.value)}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Wait for element (query selector)"
							variant="filled"
							size="small"
							value={waitForElement}
							onChange={(e) => setWaitForElement(e.target.value)}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Interval (0 or empty for no interval)"
							variant="filled"
							size="small"
							value={scriptInterval}
							onChange={(e) => setScriptInterval(e.target.value)}
							fullWidth
							margin="dense"
						></TextField>
						<div className={buttonsContainer}>
							<Button
								variant="contained"
								size="small"
								disabled={script.new}
								onClick={() => onDelete(script)}
							>
								Delete
							</Button>
							<Button
								variant="contained"
								size="small"
								onClick={() =>
									onSaveClick(
										name,
										description,
										urlMatch,
										waitForElement,
										scriptInterval
									)
								}
							>
								Save
							</Button>
						</div>
					</Box>
				</Box>
			</Drawer>
		</Box>
	);
};

export default ScriptsSidebar;
