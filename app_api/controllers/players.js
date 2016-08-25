var mongoose = require('mongoose');
var log4js = require('log4js');
var logger = log4js.getLogger('players.js');
var Player = mongoose.model('Player');


var sendJSONresponse = function(res, status, message){
  res.status(status);
  res.json(message);
};

module.exports.playersList = function(req, res){
  Player.find({}, function(err, result, stats){
    if(err){
      logger.debug('find error: ', err);
      sendJSONresponse(res, 404, err);
    }else{
      sendJSONresponse(res, 200, result);
    }
  });
};

module.exports.playersCreate = function(req, res){
  logger.debug(req.body);
  Player.create({
      name: req.body.name,
      position: req.body.position,
      number: req.body.number,
      availableDays: {
        day: req.body.day,
        time: req.body.time
      },
      user: req.payload
  }, function(err, player){
    if(err){
      logger.debug(err);
      sendJSONresponse(res, 404, err);
    }else if(player){
      sendJSONresponse(res, 200, player);
    }
  });
};

module.exports.playersReadOne = function(req, res){
  logger.debug('Finding player details', req.params);
  if(req.params && req.params.playerid){
    Player
      .findById(req.params.playerid)
      .exec(function(err, player){
        if(!player){
          sendJSONresponse(res, 404, {
            "message": "playerid not found"
          });
          return;
        }else if(err){
          logger.debug(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        logger.debug(player);
        sendJSONresponse(res, 200, player);
      });
  }else{
    logger.debug('No playerid specified');
    sendJSONresponse(res, 404, {
      "message": "No playerid in request"
    });
  }
};

module.exports.playersUpdateOne = function(req, res){
  if(!req.params.playerid){
    sendJSONresponse(res, 404, {
      "message": "Not found, playerid is required"
    });
    return;
  }
  Player
    .findById(req.params.playerid)
    .exec(function(err, player){
      if(!player){
        sendJSONresponse(res, 404, {
          "message": "playerid not found"
        });
        return;
      }else if(err){
        sendJSONresponse(res, 400, err);
        return;
      }
      player.name = req.body.name;
      player.position = req.body.position;
      player.number = req.body.number;
      player.modifiedOn = new Date();

      player.save(function(err, player){
        if(err){
          sendJSONresponse(res, 404, err);
        }else{
          sendJSONresponse(res, 200, player);
        }
      });
    });
};

module.exports.playersDeleteOne = function(req, res){
  var playerid = req.params.playerid;
  if(playerid){
    Player
      .findByIdAndRemove(playerid)
      .exec(function(err, player){
        if(err){
          logger.debug(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        logger.debug('Player id ' + playerid + ' deleted');
        sendJSONresponse(res, 204, null);
      });
  }else{
    sendJSONresponse(res, 404, {
      "message": "No playerid"
    });
  }
};

module.exports.deleteAll = function(req, res){
  Player
    .remove({}, function(err){
      if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      logger.debug('Players collection has been deleted');
      sendJSONresponse(res, 204, null);
    });
};
