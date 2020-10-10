const { DataSource } = require('apollo-datasource')
const AuthorAPI = require('./author')
const UserAPI = require('./user')
const { crud } = require('../utils')

/**
 * 1. user.js: traditional way
 * 2. author.js: improved by using `crud`
 * 3. book,publisher: simply and custom: delegate class
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
	UserAPI,
	AuthorAPI,
	DBAPI,
}
