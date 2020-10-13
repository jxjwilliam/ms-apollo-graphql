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

	// from resolvers -> Query -> users
	async list() {
		return this.store.User.findAll()
	}

	/**
	 * - both work: user.get({ plain: true }), user.toJSON()
	 * - findByPk, findOne all work
	 */
	async get(id) {
		const user = await this.store.User.findByPk(id)
		return user.toJSON()
	}

	// same as `get`
	async me(id) {
		const user = await this.store.User.findOne({ where: { id } })
		return user // user.get({ plain: true })
	}

	async post(user) {
		const result = await this.store.User.create(user)
		return result
	}

	async put({ id, user }) {
		const result = await this.store.User.update(user, { where: { id } })
		return result
	}

	async delete(id) {
		const count = await this.store.User.destroy({ where: { id } })
		return count
	}
}

module.exports = UserAPI
