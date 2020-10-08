#!/usr/bin/env node

const faker = require('faker')
const dayjs = require('dayjs')
const { createStore } = require('../src/utils')

const INIT_NUMBER = 4

const generateRandomUser = number => {
	const ary = []
	for (let i = 0; i < number; i += 1) {
		const user = Promise.resolve({
			name: faker.name.jobTitle(),
			desc: faker.lorem.words(),
			createDate: dayjs().format('YYYY-MM-DD'),
		})
		ary.push(user)
	}
	return ary
}

const { User } = createStore()

// https://eslint.org/docs/rules/no-await-in-loop
// warning: for (const user of users) await User.create(user)
User.sync({ force: false })
	.then(Promise.all(generateRandomUser(INIT_NUMBER)))
	.then(users => users.map(user => User.create(user)))
	.then(() => User.findAll())
	.then(users => console.log('Sync table and Seed User successfully:', JSON.stringify(users)))
	.catch(err => console.error(err))
