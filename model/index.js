var log = require('../utils/logger.js');
var Sequelize = require("sequelize");

/**
 * SEQUELIZE CONNECTION
 */

var sequelize = {};

sequelize.import = function () {
}; // DELETE THIS

/**
 * MODEL IMPLEMENATION
 */
var models = [
    'TeamMember',
    'Assignment',
    'Assignable'
];
/**
 * export every model
 */
models.forEach(function (model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});


module.exports.sequelize = sequelize;