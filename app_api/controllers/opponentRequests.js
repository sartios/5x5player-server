var mongoose = require('mongoose');
var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('opponentRequests.js');
var OpponentRequest = mongoose.model('OpponentRequest');
var Team = mongoose.model('Team');
var Field = mongoose.model('Field');

var sendJSONresponse = function(res, status, message){
  res.status(status);
  res.json(message);
};

module.exports.opponentRequestsList = function(req, res){
  logger.debug('opponentRequestsList()');
  OpponentRequest.find({}, function(err, result, stats){
    if(err){
      logger.debug('find opponent requests error', err);
      sendJSONresponse(res, 404, err);
    }else{
      sendJSONresponse(res, 200, result);
    }
  });
};

module.exports.opponentRequestsPopulateList = function(req, res){
  OpponentRequest.find({})
  .populate('team', 'name')
  .populate('field', 'name')
  .exec(function(err, result, stats){
    if(err){
      logger.debug('find opponent requests error', err);
      sendJSONresponse(res, 404, err);
    }else{
      sendJSONresponse(res, 200, result);
    }
  });
};

module.exports.opponentRequestReadOne = function(req, res){
  logger.debug('opponentRequestReadOne()');
  if(req.params.requestid){
    OpponentRequest.findById(req.params.requestid)
      .exec(function(err, opponentRequest){
        if(!opponentRequest){
          sendJSONresponse(res, 404, {
            "message": "request not found"
          });
          return;
        }else if(err){
          logger.debug(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        logger.debug(opponentRequest);
        sendJSONresponse(res, 200, opponentRequest);
      });
  }else{
    logger.debug('No requestid in request');
    sendJSONresponse(res, 404, {
      "message": "No requestid in request"
    });
  }
};

module.exports.opponentRequestsCreate = function(req, res) {
    logger.debug('opponentRequestsCreate()');
    validateRequest(req, res)
        .then(function(msg) {
            return validateTeam(req, res);
        })
        .then(function(msg) {
            return validateField(req, res);
        })
        .then(function(msg) {
            createOpponentRequest(req, res);
        });
};

module.exports.opponentRequestsUpdateOne = function(req, res){
  logger.debug('opponentRequestsUpdateOne()');
  validateUpdateRequest(req, res)
    .then(function(){
      return validateTeam(req, res);
    })
    .then(function(){
      return validateField(req, res);
    })
    .then(function(){
      updateOpponentRequest(req, res);
    });
};

module.exports.deleteAll = function(req, res){
  logger.debug('opponentRequestsUpdateOne()');
  OpponentRequest.remove({}, function(err, opponentRequest){
    if(err){
      logger.debug(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    sendJSONresponse(res, 204, null);
  });
};

module.exports.opponentRequestsDeleteOne = function(req, res){
  var requestid = req.params.requestid;
  if(requestid){
    OpponentRequest.findByIdAndRemove(requestid)
    .exec(function(err, opponentRequest){
      if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 204, null);
    });
  }
};

var updateOpponentRequest = function(req, res){
  OpponentRequest.findById(req.body.requestid)
    .exec(function(err, opponentRequest){
      if(!opponentRequest){
        sendJSONresponse(res, 404, {
          "message": "Opponent Request not found"
        });
        return;
      }else if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
        return;
      }

      opponentRequest.field = req.body.field;
      opponentRequest.date = req.body.date;
      opponentRequest.modifiedOn = new Date();

      opponentRequest.save(function(err, opponentRequest){
        if(err){
          logger.debug(err);
          sendJSONresponse(res, 404, err);
        }else {
          logger.debug(opponentRequest);
          sendJSONresponse(res, 200, opponentRequest);
        }
      });
    });
};

var validateUpdateRequest = function(req, res){
  logger.debug('------ validateRequest()');
  var  deferred = Q.defer();
  if(!req.body.field || !req.body.date || !req.payload){
    sendJSONresponse(res, 404, {
      "message" : "Request param(-s) missing"
    });
    deferred.reject("Request param(-s) missing");
  }
  deferred.resolve();
  return deferred.promise;
};

var validateRequest = function(req, res) {
    logger.debug('------ validateRequest()');
    var deferred = Q.defer();
    if (!req.body.team || !req.body.field || !req.body.date || !req.payload) {
        sendJSONresponse(res, 404, {
            "message": "Request param(-s) missing"
        });
        deferred.reject("Request param(-s) missing");
    }
    deferred.resolve('Request param(-s) are ok');
    return deferred.promise;
};

var validateField = function(req, res) {
    logger.debug('------ validateField()');
    var deferred = Q.defer();
    Field.findById(req.body.field._id)
        .exec(function(err, field) {
            if (!field) {
                sendJSONresponse(res, 404, {
                    "message": "Field not found"
                });
                deferred.reject('Field not found');
            } else if (err) {
                logger.debug(err);
                sendJSONresponse(res, 404, err);
                deferred.error(err);
            }
            deferred.resolve('Field found');
        });
    return deferred.promise;
};

var validateTeam = function(req, res) {
    logger.debug('------ validateTeam()');
    var deferred = Q.defer();
    Team.findById(req.body.team._id)
        .exec(function(err, team) {
            if (!team) {
                sendJSONresponse(res, 404, {
                    "message": "Team not found"
                });
                deferred.reject('Team not found');
            } else if (err) {
                logger.debug(err);
                sendJSONresponse(res, 404, err);
                deferred.reject(err);
            }
            deferred.resolve('Team found');

        });
    return deferred.promise;
};

var createOpponentRequest = function(req, res) {
    logger.debug('------ createOpponentRequest()');
    OpponentRequest.create({
        team: req.body.team,
        field: req.body.field,
        date: req.body.date,
        user: req.payload,
    }, function(err, opponentRequest) {
        if (err) {
            logger.debug(err);
            sendJSONresponse(res, 404, err);
        } else if (opponentRequest) {
            sendJSONresponse(res, 200, opponentRequest);
        }
    });
};
