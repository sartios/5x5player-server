var mongoose = require('mongoose');
var log4js = require('log4js');
var logger = log4js.getLogger('users.js');
var Team = mongoose.model('Team');
var Player = mongoose.model('Player');
var Field = mongoose.model('Field');
var OpponentRequest = mongoose.model('OpponentRequest');

var sendJSONresponse = function(res, status, message){
  res.status(status);
  res.json(message);
};

module.exports.teamsList = function(req, res) {
    validateUser(req, res, function() {
        Team.find({
            user: req.payload
        }).exec(function(err, teams) {
            if (err) {
                logger.debug(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, teams);
        });
    });
};

module.exports.playersList = function(req, res) {
    validateUser(req, res, function() {
        Player.find({
            user: req.payload
        }).exec(function(err, players) {
            if (err) {
                logger.debug(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, players);
        });
    });
};


module.exports.fieldsList = function(req, res) {
    validateUser(req, res, function() {
        Field.find({
            user: req.payload
        }).exec(function(err, fields) {
            if (err) {
                logger.debug(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, fields);
        });
    });
};

module.exports.opponentRequestsList = function(req, res) {
    validateUser(req, res, function() {
        OpponentRequest.find({
            user: req.payload
        }).exec(function(err, opponentRequests) {
            if (err) {
                logger.debug(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, opponentRequests);
        });
    });
};

var validateUser = function(req, res, callback){
  if(req.payload){
    callback();
  }
};
