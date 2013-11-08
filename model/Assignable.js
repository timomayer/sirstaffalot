// @todo Validation for fields?
module.exports = function (sequelize, DataTypes) {

	return sequelize.define('Assignable', {
		name: { type: DataTypes.STRING, allowNull: false },
		type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'project' }, // ['project', 'public holiday', 'vacation', 'not available', 'sick', ...]
		fromEmail: { type: DataTypes.STRING, validate: { isEmail: true}},
		fromBusinessUnit: { type: DataTypes.STRING },
		days: { type: DataTypes.FLOAT },
		startDate: { type: DataTypes.DATE },
		endDate: { type: DataTypes.DATE },
		description: { type: DataTypes.TEXT },
		timelineNumber: { type: DataTypes.STRING }
	}, {
		freezeTableName: true
	});

}