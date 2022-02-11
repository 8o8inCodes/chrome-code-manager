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
		<div className={container}>
			<input
				type="text"
				placeholder="Search"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
				<List>
					<ListItem disablePadding>
						<ListItemButton
							dense
							onClick={() =>
								onSelect({
									new: true,
									enabled: false,
									id: 0,
								})
							}
						>
							<ListItemText primary="Create Script" />
						</ListItemButton>
					</ListItem>
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
		</div>
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
