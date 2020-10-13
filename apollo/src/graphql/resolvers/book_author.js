module.exports = {
	Query: {
		book_authors: (_, args, { dataSources }) => {
			return dataSources.bookAuthorAPI.list()
		},
		book_author: (_, { bookId }, { dataSources }) => {
			return dataSources.bookAuthorAPI.getByBookId(bookId)
		},
		author_book: (_, { authorId }, { dataSources }) => {
			return dataSources.bookAuthorAPI.getByAuthorId(authorId)
		},
	},

	Mutation: {
		setBookAuthor: (_, { bookId, authorIds }, { dataSources }) => {
			const pary = authorIds.map(aid =>
				dataSources.bookAuthorAPI.post({
					bookId,
					authorId: aid,
				})
			)

			return Promise.all(pary).then(data => {
				// 2 array: console.log('===: ', data, typeof data)
				return {
					success: true,
					code: `add bookId=${bookId}, authIds=${authorIds.join(',')}`,
				}
			})
		},
	},
}
