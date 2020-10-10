const { DataSource } = require('apollo-datasource')
const { crud } = require('../utils')

class AuthorAPI extends DataSource {
	constructor({ store, Model }) {
		super()
		this.store = store
		const db_access = crud(Model)
		Object.assign(this, db_access)
		/**
		 * replace:
			this.list = db_access.list
			this.get = db_access.get
			this.post = db_access.post
			this.put = db_access.put
			this.delete = db_access.delete
		 */
	}

	initialize(config) {
		this.context = config.context
	}
}

module.exports = AuthorAPI
