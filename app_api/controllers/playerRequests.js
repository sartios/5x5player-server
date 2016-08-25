var mongoose = require('mongoose');
var log4js = require('log4js');
var logger = log4js.getLogger('playerRequests.js');
var PlayerRequest = mongoose.model('PlayerRequest');
var Team = mongoose.model('Team');
var Field = mongoose.model('Field');

var sendJSONresponse = function(res, status, message){
  res.status(status);
  res.json(message);
};

module.exports.playerRequestsList = function(req, res){
  PlayerRequest.find({})
    .exec(function(err, results){
      if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
      }else if(results){
        sendJSONresponse(res, 200, results);
      }
    });
};

module.exports.playerRequestReadOne = function(req, res){
  logger.debug('playerRequestReadOne()');
  validateRequest(req, res, getPlayerRequestById);
};

module.exports.playerRequestCreateOne = function(req, res){
  logger.debug('playerRequestCreateOne()');
  validateRequest(req, res, createPlayerRequest);
};

module.exports.playerRequestUpdateOne = function(req, res){
  logger.debug('playerRequestUpdateOne()');
  validateRequest(req, res, updatePlayerRequest);
};

module.exports.playerRequestsDeleteAll = function(req, res){
  logger.debug('playerRequestsDeleteAll()');
  PlayerRequest.remove({})
    .exec(function(err, results){
      if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      logger.debug('PlayerRequest collections have been deleted');
      sendJSONresponse(res, 204, {
        "message": "PlayerRequest collections have been deleted"
      });
    });
};

module.exports.playerRequestsDeleteOne = function(req, res){
  logger.debug('playerRequestsDeleteOne()');
  var requestID = req.params.requestid;
  PlayerRequest.findByIdAndRemove(requestID)
    .exec(function(err, result){
      if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 201, {
        "message": "PlayerRequest with ID " + requestID + " has been deleted"
      });
    });
};

var validateRequest = function(req, res, callback){
  callback(req, res);
};

var updatePlayerRequest = function(req, res){
  logger.debug('Update PlayerRequest ID: ' + req.params.requestid);
  PlayerRequest.findById(req.params.requestid)
    .exec(function(err, result){
      if(!result){
        var msg = "PlayerRequest with ID: " + req.params.requestid + " did not found";
        logger.debug(msg);
        sendJSONresponse(res, 404, {
          "message": msg
        });
      }else if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
      }else if(result){
        result.field = req.body.field;
        result.date = req.body.date;
        result.numberOfPlayers = req.body.numberOfPlayers;
        result.modifiedOn = new Date();

        result.save(function(error, updatedResult){
          if(error){
            logger.debug(error);
            sendJSONresponse(res, 404, error);
          }else if(updatedResult){
            sendJSONresponse(res, 200, updatedResult);
          }
        });
      }
    });
};

var getPlayerRequestById = function(req, res){
  PlayerRequest.findById(req.params.requestid)
    .exec(function(err, result){
      if(!result){
        var msg = "PlayerRequest with ID: " + req.params.requestid + " did not found";
        logger.debug(msg);
        sendJSONresponse(res, 404, {
          "message": msg
        });
      }else if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
      }else if(result){
        sendJSONresponse(res, 200, result);
      }
    });
};

var createPlayerRequest = function(req, res){
    PlayerRequest.create({
      team: req.body.team,
      field: req.body.field,
      date: req.body.date,
      numberOfPlayers: req.body.numberOfPlayers,
      user: req.payload
    }, function(err, playerRequest){
      if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
      }else if(playerRequest){
        logger.debug(playerRequest);
        sendJSONresponse(res, 200, playerRequest);
      }
    });
};
