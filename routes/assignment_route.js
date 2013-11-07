var AsignmentService = require('../services/AssignmentService');
var timeConverter = require('../utils/timeConverter.js');
var log = require('../utils/logger.js');

exports.teamMemberrAssignments = function (req, res, next) {
    try {
        if (!req.body) {
            throw new Error('Missing Parameters...');
        }
        var fromCW = timeConverter.convertCWStringToTimeJSON(req.body.fromCW);
        var toCW = timeConverter.convertCWStringToTimeJSON(req.body.toCW);
    }
    catch (err) {
        next(err);
    }
    AsignmentService.getAssignmentsForTeamMembers(fromCW, toCW, function (err, result) {
        if (err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
}

exports.assignableAssignments = function (req, res, next) {
    try {
        if (!req.body) {
            throw new Error('Missing Parameters...');
        }
        var fromCW = timeConverter.convertCWStringToTimeJSON(req.body.fromCW);
        var toCW = timeConverter.convertCWStringToTimeJSON(req.body.toCW);
    }
    catch (err) {
        next(err);
    }

    AsignmentService.getAssignemntsForAssignables(fromCW, toCW, function (err, result) {
        if (err) {
            next(err);
        }
        else {
            res.json(result);
        }
    });
}