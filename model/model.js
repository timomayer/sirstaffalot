var log = require('../utils/logger.js');
var Sequelize = require("sequelize");
var config = require('../config.json').development.mySQL;

/**
 * SEQUELIZE CONNECTION
 */
var sequelize = new Sequelize(config.dbName, config.username, config.password, {
    host: config.host,
    port: config.port
});

/**
 * MODEL IMPLEMENATION
 */
var models = [
    'Assignable',
    'TeamMember',
    'Assignment'
];
/**
 * export every model
 */

models.forEach(function (model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
    m.TeamMember.hasMany(m.Assignable, { joinTableModel: m.Assignment });
    m.Assignable.hasMany(m.TeamMember, { joinTableModel: m.Assignment });
})(module.exports);



module.exports.sequelize = sequelize;