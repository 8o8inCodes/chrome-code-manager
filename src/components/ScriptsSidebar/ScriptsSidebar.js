import React, { useState } from "react";
import s, {
	container,
	scriptButtonContainer,
	divButton,
} from "./ScriptsSidebar.module.css";
import { IoMdPower } from "react-icons/io";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ScriptsSidebar = ({
	scripts,
	onSelect,
	onToggle,
	loading,
	selectedScript,
}) => {
	const [searchText, setSearchText] = useState("");
	if (loading) return <div className={container}>Loading...</div>;
	return (
		<Box sx={{ width: "316px" }}>
			<Box component="div" sx={{ p: 2 }}>
				<TextField
					label="Search"
					variant="filled"
					size="small"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</Box>
			<Box
				sx={{
					width: "100%",
					maxWidth: 360,
					maxHeight: "486px",
					bgcolor: "background.paper",
					overflowY: "auto",
				}}
			>
				<List>
					{scripts
						.filter((current) => current.name.includes(searchText))
						.map((script) => (
							<ScriptButton
								key={script.id}
								script={script}
								onSelect={onSelect}
								onToggle={onToggle}
								selected={selectedScript && selectedScript.id === script.id}
							/>
						))}
				</List>
			</Box>
			<Button
				variant="contained"
				size="small"
				onClick={() =>
					onSelect({
						new: true,
						name:
							scripts.length > 0
								? `new-script-${scripts.length + 1}`
								: "new-script",
						enabled: false,
						id: 0,
					})
				}
			>
				Create Script
			</Button>
		</Box>
	);
};

const ScriptButton = ({ script, onSelect, onToggle, selected }) => {
	return (
		<>
			<ListItem
				disablePadding
				secondaryAction={
					<Switch
						size="small"
						label="status"
						checked={script.enabled}
						onChange={() => onToggle(script)}
						defaultChecked
					/>
				}
			>
				<ListItemButton
					selected={selected}
					dense
					onClick={() => onSelect(script)}
				>
					<ListItemText primary={script.name} />
				</ListItemButton>
			</ListItem>
		</>
	);
};

export default ScriptsSidebar;
