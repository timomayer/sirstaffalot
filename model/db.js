/**
 * Created with IntelliJ IDEA.
 * User: Armin
 * Date: 07.11.13
 * Time: 11:50
 * To change this template use File | Settings | File Templates.
 */

var log = require('../utils/logger.js');
var Sequelize = require("sequelize");

var sequalize = new Sequelize('database', 'username', 'password', {
    host: "my.server.tld",
    port: 12345
});

var Assignable = sequalize.define('Assignable', {
    id:                 { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement:true },
    name:               { type: Sequelize.STRING, allowNull: false },
    type:               { type: Sequelize.String, allowNull: false, defaultValue: 'project' }, // ['project', 'public holiday', 'vacation', 'not available', 'sick', ...]
    fromEmail:          { type: Sequelize.STRING },
    fromBusinessUnit:   { type: Sequelize.STRING },
    days:               { type: Sequelize.DOUBLE },
    startDate:          { type: Sequelize.DATETIME },
    endDate:            { type: Sequelize.DATETIME },
    description:        { type: Sequelize.TEXT },
    timelineNumber:     { type: Sequelize.STRING }
});


var TeamMember = sequalize.define('TeamMember', {
    id:                 { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement:true },
    name:               { type: Sequelize.STRING, allowNull: false },
    type:               { type: Sequelize.String, allowNull: false, defaultValue: 'internal' }, // ['internal', 'external']
    email:              { type: Sequelize.STRING }
});

var Assignment = sequalize.define('Assignment', {
    cw:                 { type: Sequelize.INTEGER, allowNull: false },
    year:               { type: Sequelize.INTEGER, allowNull: false },
    days:               { type: Sequelize.DOUBLE, allowNull: false}
});

TeamMember.hasMany(Assignable, { joinTableModel: Assignment })
Assignable.hasMany(TeamMember, { joinTableModel: Assignment })

exports.db = sequalize;