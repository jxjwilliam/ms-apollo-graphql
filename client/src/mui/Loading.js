import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

// loading.io
const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		height: '80vh',
	},
	center: {
		position: 'relative',
		top: '50%',
		transform: 'translateY(-50%)',
	},
	center1: {
		maxHeight: '100%',
		maxWidth: '100%',
		width: 'auto',
		height: 'auto',
		position: 'absolute',
		top: '50%',
		bottom: '50%',
		left: 0,
		right: 0,
		margin: 'auto',
	}
}))

export default function () {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CircularProgress color={'secondary'} className={classes.center} />
		</div>
	)
}
