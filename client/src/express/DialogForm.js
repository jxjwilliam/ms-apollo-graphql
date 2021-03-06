import React from 'react'
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles'
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import { Forum as ForumIcon } from '@material-ui/icons';
import { isEmpty, getToday } from '../helpers/utils'

const useStyles = makeStyles(theme => ({
	form: {
		width: 600
	}
}))

export default function ({ open, handleToggle, rowData, onSubmit }) {
	const classes = useStyles();
	const { register, handleSubmit } = useForm({ defaultValues: rowData });
	const action = isEmpty(rowData) ? '添加' : '修改'

	const handleAction = data => {
		let type;
		if (isEmpty(rowData)) type = 'ADD'
		else {
			type = 'UPDATE'
			data = { ...data, id: rowData.id }
		}
		return Promise.resolve(onSubmit(type, data)).then(handleToggle)
	}

	return (
		<>
			<Dialog open={open} onClose={handleToggle} aria-labelledby={"form-dialog-title"}>
				<DialogTitle id="form-dialog-title"><ForumIcon />博客</DialogTitle>
				<form className={classes.form} onSubmit={handleSubmit(handleAction)}>
					<DialogContent>
						<DialogContentText>
							{action}博客内容
						</DialogContentText>
						<TextField
							autoFocus
							id="title"
							name="title"
							label="标题"
							inputRef={register}
							fullWidth
							margin="normal"
						/>
						<br />
						<TextField
							id="author"
							name="author"
							label="作者"
							inputRef={register}
							fullWidth
							margin="normal"
						/>
						<br />
						<TextField
							id="createDate"
							name="createDate"
							label="日期"
							inputRef={register}
							fullWidth
							margin="normal"
							defaultValue={getToday()}
						/>
						<br />
						<TextField
							multiline
							rows={4}
							id="description"
							name="description"
							label="内容"
							inputRef={register}
							fullWidth
							margin="normal"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleToggle} color="secondary">
							取消
						</Button>
						<Button type="submit" color="primary" variant="contained">
							{action}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	)
}
