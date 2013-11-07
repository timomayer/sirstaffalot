// @todo Validation for fields?
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('TeamMember', {
        name:               { type: DataTypes.STRING, allowNull: false },
        type:               { type: DataTypes.STRING, allowNull: false, defaultValue: 'internal' }, // ['internal', 'external']
        email:              { type: DataTypes.STRING, validate: { isEmail: true} }
    }, {

        freezeTableName: true
    });
}