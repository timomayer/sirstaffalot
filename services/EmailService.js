var _ = require('underscore');
var nodemailer = require('nodemailer');

var log = require('../utils/logger.js');
var sequelize = require('../model/model.js').sequelize;
var timeConverter = require('../utils/timeConverter.js');
var Assignment = require('../model/model.js')['Assignment'];
var Assignable = require('../model/model.js')['Assignable'];

module.exports = {

	triggerAssignmentMail: function (callback) {
		var result;

		var pmTopProject = {};
		_.each(result, function (assignment) {
			if (!pmTopProject[assignment.fromEmail]) {
				pmTopProject[assignment.fromEmail] = {};
			}
			if (pmTopProject[assignment.fromEmail][assignment.assignableId]) {
				pmTopProject[assignment.fromEmail][assignment.assignableId] = {};
				pmTopProject[assignment.fromEmail][assignment.assignableId].assignableName = assignment.assignableName;
				pmTopProject[assignment.fromEmail][assignment.assignableId].startDate = timeConverter(assignment.startDate);
				pmTopProject[assignment.fromEmail][assignment.assignableId].endDate = timeConverter(assignment.endDate);
				pmTopProject[assignment.fromEmail][assignment.assignableId].teamMember = [];
			}
			pmTopProject[assignment.fromEmail][assignment.assignableId].push(assignment.teamMemberName);
		});

		var emailsToSend = [];
		_.each(pmTopProject, function (projects, pmEmail) {
			var mailBody = 'AUTOMATED MAIL FROM "SIR STAFFELOT!"\n';
			mailBody += 'SEND THIS MAIL TO: ' + pmEmail + '\n';
			mailBody = '----------------------------------------------'
			mailBody += 'Team Fat-Fred sagt Hallo! \n\n Folgende Projekte wurden gestaffed: ';

			_.each(projects, function (project) {
				mailBody += '__________________';
				mailBody += 'Projekt: ' + project.assignableName + '\n';
				mailBody += 'vom ' + project.startDate + ' bis zum ' + project.endDate + '\n';
				mailBody += 'wird umgestzt von: ' + project.teamMember.join(', ');
				mailBody += '__________________';
			});

			var smtpTransport = nodemailer.createTransport("SMTP",{
				service: "Gmail",
				auth: {
					user: "gmail.user@gmail.com",
					pass: "userpass"
				}
			});

			emailsToSend.push({
				from: 'SirStaffalot@virtual-identity.com',
				to: 'dev.fat-fred@virtual-identity.com',
				subject: 'New Staffing Mail',
				text: mailBody

			});
		});


	}

};



