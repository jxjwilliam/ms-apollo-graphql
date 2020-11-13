const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class book extends Model {
		/**
		 * To create a `One-To-One` relationship, the `hasOne` and `belongsTo` associations are used together;
		 * To create a `One-To-Many` relationship, the `hasMany` and `belongsTo` associations are used together;
		 * To create a `Many-To-Many` relationship, two `belongsToMany` calls are used together.
		 */
		static associate(models) {
			models.Book.belongsToMany(models.Author, { through: 'authorId' })
			models.Book.belongsTo(models.Publisher)
		}
	}
	book.init(
		{
			title: DataTypes.STRING,
			desc: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Book',
		}
	)
	return book
}
