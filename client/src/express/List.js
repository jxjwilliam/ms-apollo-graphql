import React, { useState, useRef, useMemo } from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import DialogForm from './DialogForm'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}))

export default function ({ data: { Blogs }, onSubmit }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [rowData, setRowData] = useState({})
	const handleToggle = () => setOpen(!open)

	// pretty strange: need this convert, otherwise error.
	const rows = Blogs.map(blog => ({ ...blog }))
	console.log('without useMemo, rows render 2 times', Blogs, rows)
	return (
		<div className={classes.root}>
			<>
				{open ? (
					// DialogForm uses Portal underneath, so <Portal/> is optional.
					<DialogForm
						open={open}
						handleToggle={handleToggle}
						rowData={rowData}
						onSubmit={onSubmit}
					/>
				) : null}
			</>
			<MaterialTable
				title="博客内容列表"
				columns={[
					{ field: 'id', title: '序号' },
					{ field: 'title', title: '标题' },
					{ field: 'author', title: '作者' },
					{ field: 'createDate', title: '日期' },
					{ field: 'description', title: '内容' },
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
							if(window.confirm("You want to delete " + rowData.id))
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
