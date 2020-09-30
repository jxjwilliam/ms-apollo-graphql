import React from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Checkbox, Grid, FormControlLabel, Button } from "@material-ui/core";
import { getToday, isEmpty } from '../../helpers/utils'

const useStyles = makeStyles(theme => ({
	form: {
		margin: theme.spacing(3),
	},
	title: {
		marginTop: theme.spacing(2),
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}))

export default function ({ rowData, handleToggle, onSubmit }) {
	const classes = useStyles()
	const { register, handleSubmit } = useForm({ defaultValues: rowData });
	const action = isEmpty(rowData) ? '添加' : `修改 ${rowData.id}`

	const handleAction = data => {
		let type;
		if (isEmpty(rowData)) type = 'ADD'
		else {
			type = 'UPDATE'
			data = { ...data, id: rowData.id }
		}
		return Promise.resolve(onSubmit(type, data)).then(handleToggle)
	}

	const [checked, setChecked] = React.useState(isEmpty(rowData) ? false : rowData.completed);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	}

	return (
		<form onSubmit={handleSubmit(handleAction)} className={classes.form}>
			<Grid item xs={12} sm={12} direction="row" justify="space-around" alignItems="center" container>
				<Grid item xs={12}>
					<TextField
						required
						id="title"
						name="title"
						label="What to do?"
						inputRef={register}
						fullWidth
						autoComplete="title"
						className={classes.title}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="description"
						name="description"
						label="Description..."
						inputRef={register}
						fullWidth
						multiline
						rows={6}
						autoComplete="description"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								color="secondary"
								name="completed"
								checked={checked}
								onChange={handleChange}
								inputRef={register}
							/>}
						label="Completed"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="createDate"
						name="createDate"
						label="Create Date"
						inputRef={register}
						fullWidth
						defaultValue={getToday()}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Button type="submit" variant="outlined" color="primary" className={classes.button}>
						{action}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}
