import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Tabs, Tab } from '@material-ui/core';
import Blog from './express/'
import Gateway from './gateway/'
import Todo from './gateway/apollo-express/'
import Author from './gateway/apollo/'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
}

export default function App() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Apollo Express" />
				<Tab label="Apollo" />
				<Tab label="Express" />
			</Tabs>
			<TabPanel value={value} index={2}>
				<Blog />
			</TabPanel>
			<Gateway>
				<TabPanel value={value} index={1}>
					<Author />
				</TabPanel>
				<TabPanel value={value} index={0}>
					<Todo />
				</TabPanel>
			</Gateway>
		</Container>
	);
}