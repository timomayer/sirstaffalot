var sequelize = require('../model/model.js').sequelize;
var log = require('../utils/logger.js');


sequelize.sync().success(function () {
    log.info('Database Synced!');
}).error(function (err) {
        log.error(err);
    });