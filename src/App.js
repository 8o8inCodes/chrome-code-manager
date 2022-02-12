/*global chrome*/
import { app } from "./App.module.css";
import { useState, useEffect } from "react";
import ScriptsSidebar from "./components/ScriptsSidebar";
import CodeEditor from "./components/CodeEditor";
import { nanoid } from "nanoid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const confirmationModalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	color: "white",
	p: 4,
};

const App = () => {
	const [scripts, setScripts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedScript, setSelectedScript] = useState({ new: true });
	const [dirty, setDirty] = useState(false);

	const [confirmationModal, setConfirmationModal] = useState({});

	const openConfirmationModal = (message, title, onConfirm) => {
		setConfirmationModal({
			open: true,
			message,
			title,
			onConfirm,
		});
	};

	useEffect(() => {
		// Load the scripts from the chrome store
		if (chrome.storage) {
			chrome.storage.sync.get((data) => {
				setScripts(data["scripts"] || []);
				setLoading(false);
			});
		} else {
			console.log("Extension chrome storage isn't available.");
		}
	}, []);

	const onSelect = (script) => {
		if (!dirty) {
			setSelectedScript(script);
		} else {
			openConfirmationModal(
				"Your current script is not saved. Are you sure you want to switch to another script without saving?",
				"Warning",
				() => {
					setSelectedScript(script);
					setDirty(false);
				}
			);
		}
	};

	const onSave = (script) => {
		// check if scripts already containing a script with the same ID, if it does, override it,
		// otherwise push it. And set "new" attribute to false. and update the chrome store
		console.log("on Save");
		let updatedScripts = [];
		if (!script.new) {
			const scriptIndex = scripts.findIndex((s) => s.id === script.id);
			updatedScripts = [
				...scripts.slice(0, scriptIndex),
				script,
				...scripts.slice(scriptIndex + 1, scripts.length),
			];
		} else {
			updatedScripts = [
				{
					...script,
					new: false,
					id: nanoid(),
				},
				...scripts,
			];
		}
		updateScripts(updatedScripts, setScripts);
	};

	const onDelete = (script) => {
		const scriptIndex = scripts.findIndex((s) => s.id === script.id);
		if (scriptIndex < 0) return;
		const updatedScripts = [
			...scripts.slice(0, scriptIndex),
			...scripts.slice(scriptIndex + 1, scripts.length),
		];

		updateScripts(updatedScripts);
	};

	const updateScripts = (updatedScripts) => {
		if (chrome.storage) {
			chrome.storage.sync.get((data) => {
				const updatedStorage = {
					...data,
					scripts: updatedScripts,
				};
				chrome.storage.sync.set(updatedStorage, function () {
					console.log("Storage updated.");
				});
			});
		} else {
			console.warn(
				"Cannot save to the persistance storage since the extension isn't running as an extension."
			);
		}
		setScripts(updatedScripts);
	};

	const onToggle = (script) => {
		// Toggle enabled and update the chrome store
		console.log("on Toggle");
		const updatedScript = {
			...script,
			enabled: !script.enabled,
		};
		onSave(updatedScript);
	};

	return (
		<div className={app}>
			<ScriptsSidebar
				scripts={scripts}
				onSelect={onSelect}
				onToggle={onToggle}
				loading={loading}
				selectedScript={selectedScript}
			/>
			<CodeEditor
				onSave={onSave}
				onDelete={onDelete}
				script={selectedScript}
				setDirty={setDirty}
				dirty={dirty}
			/>
			<Modal
				open={confirmationModal.open}
				onClose={() => setConfirmationModal({})}
			>
				<Box sx={confirmationModalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{confirmationModal.title}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{confirmationModal.message}
					</Typography>

					<Stack direction="row" justifyContent="end">
						<Button
							variant="contained"
							size="small"
							onClick={() => setConfirmationModal({})}
							sx={{
								mr: 2,
							}}
						>
							No
						</Button>
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								confirmationModal.onConfirm && confirmationModal.onConfirm();
								setConfirmationModal({});
							}}
						>
							Yes
						</Button>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
};

export default App;
