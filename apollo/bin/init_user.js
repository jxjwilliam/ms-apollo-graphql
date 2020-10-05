#!/usr/bin/env node

const faker = require('faker')
const dayjs = require('dayjs')
const { createStore } = require('../src/utils')

const users = []

const generateRandomUser = async () => {
	const ary = []
	for (let i = 0; i < 4; i += 1) {
		const user = await {
			name: faker.name.jobTitle(),
			desc: faker.lorem.words(),
			createDate: dayjs().format('YYYY-MM-DD'),
		}
		await ary.push(user)
	}
	return ary
}

const { User } = createStore()

User.sync({ force: false })
	.then(async () => {
		for (const user of users) {
			await User.create(user)
		}
	})
	.then(() => {
		console.log('Sync table and Seed User successfully.')
	})
	.catch(err => console.error(err))
