const { DataSource } = require('apollo-datasource')

class AuthorAPI extends DataSource {
	constructor({ store }) {
		super()
		this.store = store
	}

	initialize(config) {
		this.context = config.context
	}
}

module.exports = AuthorAPI
