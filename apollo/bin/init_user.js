#!/usr/bin/env node

const path = require('path')

const basename = path.resolve(path.join(__dirname, '..'))

const { User } = require(`${basename}/models/index`)

const UserData = []

User.sync({ force: false })
	.then(() => UserData.forEach((item, inx) => {

			const {organization_id, department_id, ...rest} = item;

			setTimeout(() => {
				User.create(rest).then(user => {
					user.setOrganization(organization_id);
					user.setDepartment(department_id);
				})
			}, 1000 * inx)
		})
	)
	.then(user => console.log('Sync table and Seed User successfully.'))
