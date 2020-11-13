const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class publisher extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Publisher.hasMany(models.Book)
		}
	}
	publisher.init(
		{
			name: DataTypes.STRING,
			desc: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Publisher',
		}
	)
	return publisher
}
