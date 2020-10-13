const { DataSource } = require('apollo-datasource')
const AuthorAPI = require('./author')
const { crud } = require('../utils')

/**
 * - author.js: improved by using `crud`
 * - book,publisher: simply and custom: delegate class
 */
class DBAPI extends DataSource {
	constructor(props) {
		super(props)
		const db_access = crud(props.Model)
		Object.assign(this, db_access)
	}

	initialize(config) {
		this.context = config.context
	}
}

module.exports = {
	AuthorAPI,
	DBAPI,
}
