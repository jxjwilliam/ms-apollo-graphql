const { DataSource } = require('apollo-datasource')

class PublisherAPI extends DataSource {
	constructor({ store }) {
		super()
		this.store = store
	}

	initialize(config) {
		this.context = config.context
	}
}

module.exports = PublisherAPI
