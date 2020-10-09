const { DataSource } = require('apollo-datasource')

/**
 * similiar: controllers, crud
 */
class UserAPI extends DataSource {
	constructor({ store }) {
		super()
		this.store = store
	}

	initialize(config) {
		this.context = config.context
	}

	async list() {
		// console.log('444: ', this.store.then(data => console.log(data)))
		const User = await this.store
		console.log('666', User.User)
		return User.User.findAll()
	}

	async get({ id }) {
		const user = await this.store.User.findByPk(id)
		return user
	}

	async post({ user }) {
		const result = await this.store.User.save(user)
		return result
	}

	async put({ id, user }) {
		const result = await this.store.User.update(
			{
				where: { id },
			},
			user
		)
		return result
	}

	async delete({ id }) {
		const result = await this.store.User.delete(id)
		return result
	}
}

module.exports = UserAPI
