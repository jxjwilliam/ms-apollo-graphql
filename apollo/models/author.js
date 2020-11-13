const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class author extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Author.belongsToMany(models.Book, { through: 'bookId' })
		}
	}
	author.init(
		{
			name: DataTypes.STRING,
			desc: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Author',
		}
	)
	return author
}
