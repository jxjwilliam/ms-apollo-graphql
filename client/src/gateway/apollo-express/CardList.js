import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {Add as AddIcon, FormatListNumbered, CheckCircle, PhotoCamera as CameraIcon } from '@material-ui/icons';
import {Card, CardHeader, CardContent, CardActions, CardMedia} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import { getRandomImage } from '../../helpers/utils'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import HookForm from './HookForm'

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function ({ todos, onSubmit }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false)
	const [rowData, setRowData] = useState({})

	console.log('%c In CardList:', 'color:green', todos);

	const handleOpen = () => setOpen(!open)

	const handleCreate = () => {
		setRowData({})
		handleOpen()
	}

	const handleEdit = (todo) => () => {
		setRowData(todo)
		setOpen(true)
	}

	const handleDelete = (id) => () => {
		if (window.confirm("You want to delete " + id)) {
			onSubmit('DELETE', id)
			handleOpen()
		}
	}

	return (
		<>
			{ open ? (
				<Dialog open={open} onClose={handleOpen} aria-labelledby="simple-dialog-title">
					<DialogTitle id="simple-dialog-title"><FormatListNumbered/> TODO</DialogTitle>
					<HookForm rowData={rowData} onSubmit={onSubmit} handleToggle={handleOpen}/>
				</Dialog>
			) : null}
			<>
				<CssBaseline />
				<AppBar position="relative">
					<Toolbar>
						<CameraIcon className={classes.icon} />
						<Typography variant="h6" color="inherit" noWrap>
							My TODO List
					</Typography>
						<Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreate}>
							Create
					</Button>
					</Toolbar>
				</AppBar>
				<main>
					<Container className={classes.cardGrid} maxWidth="md">
						{/* End hero unit */}
						<Grid container spacing={4}>
							{todos.map((todo, idx) => {
								const { title, description, createDate, completed, id } = todo
								const image = getRandomImage()
								return (
									<Grid item key={`${title}_${idx}`} xs={12} sm={6} md={4}>
										<Card className={classes.card}>
											<CardHeader
												avatar={
													<Avatar aria-label="recipe" className={classes.avatar}>
														{id}
														{/*{title.charAt(0).toUpperCase()}*/}
												</Avatar>
												}
												title={title}
												subheader={createDate}
											/>
											<CardMedia
												className={classes.cardMedia}
												image={image}
												title={title}
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom component="div">
													{completed ? <CheckCircle color="secondary" />: "Not Done"}
												</Typography>
												<Typography component={"p"}>
													{description}
												</Typography>
											</CardContent>
											<CardActions>
												<Button variant="outlined" size="small" color="primary" onClick={handleEdit(todo)}>
													Edit
												</Button>
												<Button variant="outlined" size="small" color="primary" onClick={handleDelete(id)}>
													Delete
												</Button>
											</CardActions>
										</Card>
									</Grid>
								)
							})}
						</Grid>
					</Container>
				</main>
			</>
		</>
	);
}