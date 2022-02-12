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
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

const ScriptsSidebar = ({ script, onSave, onDelete, setDirty, dirty }) => {
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
			setName(script.name || "");
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
		setDirty(false);
	};
	return (
		<Box sx={{ height: "564px", width: "100%" }}>
			<AceEditor
				placeholder="Code"
				mode="javascript"
				theme="monokai"
				onChange={(c) => {
					setDirty(true);
					setCode(c);
				}}
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
			<Stack direction="row" justifyContent="end" alignItems="center">
				<Typography
					variant="subtitle1"
					gutterBottom
					component="span"
					sx={{ ml: 2 }}
				>
					{script.name}
				</Typography>
				<Button onClick={() => setMetadataDrawerOpen(true)} sx={{ ml: 2 }}>
					Script Settings
				</Button>
				<Button
					variant="contained"
					size="small"
					disabled={script.new}
					onClick={() => onDelete(script)}
					sx={{ ml: 2 }}
				>
					Delete
				</Button>
				<Button
					disabled={!dirty}
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
					sx={{ ml: 2 }}
				>
					Save
				</Button>
			</Stack>
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
							onChange={(e) => {
								setDirty(true);
								setName(e.target.value);
							}}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Description"
							variant="filled"
							size="small"
							value={description}
							onChange={(e) => {
								setDirty(true);
								setDescription(e.target.value);
							}}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Url Match"
							variant="filled"
							size="small"
							value={urlMatch}
							onChange={(e) => {
								setDirty(true);
								setUrlMatch(e.target.value);
							}}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Wait for element (query selector)"
							variant="filled"
							size="small"
							value={waitForElement}
							onChange={(e) => {
								setDirty(true);
								setWaitForElement(e.target.value);
							}}
							fullWidth
							margin="dense"
						></TextField>
						<TextField
							label="Interval (0 or empty for no interval)"
							variant="filled"
							size="small"
							value={scriptInterval}
							onChange={(e) => {
								setDirty(true);
								setScriptInterval(e.target.value);
							}}
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
								disabled={!dirty}
								variant="contained"
								size="small"
								onClick={() => {
									onSaveClick(
										name,
										description,
										urlMatch,
										waitForElement,
										scriptInterval
									);
									setMetadataDrawerOpen(false);
								}}
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
