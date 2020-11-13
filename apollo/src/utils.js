const { Sequelize } = require('sequelize')

module.exports.createStore = () => {
	let db
	try {
		db = new Sequelize({
			dialect: 'sqlite',
			storage: './store.sqlite',
		})
	} catch (err) {
		console.error(err)
	}

	const Book = db.define('book', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		title: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	const Author = db.define('author', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		name: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	const Publisher = db.define('publisher', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		name: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	const BookAuthor = db.define('book_author', {
		bookId: Sequelize.INTEGER,
		authorId: Sequelize.INTEGER,
	})

	return { db, BookAuthor, Book, Author, Publisher }
}

module.exports.crud = Model => {
	const stand = {
		// from resolvers -> Query
		list() {
			return Model.findAll()
		},

		async get(id) {
			const data = await Model.findByPk(id)
			return data
		},

		async post(data) {
			const result = await Model.create(data)
			return result
		},

		async put({ id, data }) {
			const result = await Model.update(data, { where: { id } })
			return result
		},

		async delete(id) {
			const count = await Model.destroy({ where: { id } })
			return count
		},
	}

	// Only apply to book_author
	if (typeof Model === 'function' && Model.name === 'book_author') {
		const getByBookId = bookId => Model.findAll({ where: { bookId } })

		const getByAuthorId = authorId => Model.findAll({ where: { authorId } })

		Object.assign(stand, { getByBookId, getByAuthorId })
	}

	return stand
}
