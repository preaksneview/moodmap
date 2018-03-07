module.exports = function (sequelize, DataTypes) {
	var Questions = sequelize.define("Questions", {
		questionId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		answer: {
			type:  DataTypes.STRING,
			allowNull: false
		}
	});
	Questions.associate = function(models) {
		Questions.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	return Questions;
};