import React, { useState } from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}))

export default function ({ authors, onSubmit }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [rowData, setRowData] = useState({})
	const handleToggle = () => setOpen(!open)

	// pretty strange: need this convert, otherwise error.
	const rows = authors.map(author => ({ ...author }))
	console.log('without useMemo, rows render 2 times', authors, rows)
	return (
		<div className={classes.root}>
			<MaterialTable
				title="博客内容列表"
				columns={[
					{ field: 'id', title: '序号' },
					{ field: 'title', title: '标题' },
					{ field: 'author', title: '作者' },
					{ field: 'name', title: '日期' },
					{ field: 'desc', title: '内容' },
				]}
				data={rows}
				actions={[
					{
						icon: 'add',
						tooltip: '打开博客对话框',
						isFreeAction: true,
						onClick: (event) => {
							setRowData({})
							handleToggle()
						}
					},
					{
						icon: 'edit',
						tooltip: '更新',
						onClick: (event, rowData) => {
							setRowData(rowData)
							setOpen(true)
						}
					},
					{
						icon: 'delete',
						tooltip: '删除',
						onClick: (event, rowData) => {
							if (window.confirm("You want to delete " + rowData.id))
								onSubmit('DELETE', rowData.id)
						}
					}
				]}
				options={{ actionsColumnIndex: -1 }}
				toolbarButtonAlignment={"right"}
			/>
		</div>
	)
}
