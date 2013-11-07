// @todo Validation for fields?
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Assignment', {
        cw:                 { type: DataTypes.INTEGER, allowNull: false },
        year:               { type: DataTypes.INTEGER, allowNull: false },
        days:               { type: DataTypes.FLOAT, allowNull: false}
    });
}

