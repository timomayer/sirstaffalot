// @todo Validation for fields?
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Assignment', {
		cw: {  type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
		year: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
		days: { type: DataTypes.FLOAT}
	}, {
		freezeTableName: true
	});
}

