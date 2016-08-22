var mongoose = require('mongoose');
var PlayerRequest = mongoose.model('PlayerRequest');
var Team = mongoose.model('Team');
var Field = mongoose.model('Field');

var sendJSONresponse = function(res, status, message){
  res.status(status);
  res.json(message);
};

module.exports.playerRequestsList = function(req, res){};
module.exports.playerRequestReadOne = function(req, res){};
module.exports.playerRequestCreateOne = function(req, res){};
module.exports.playerRequestUpdateOne = function(req, res){};
module.exports.playerRequestsDeleteAll = function(req, res){};
module.exports.playerRequestsDeleteOne = function(req, res){};
