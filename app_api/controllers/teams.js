var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var Player = mongoose.model('Player');

var sendJSONresponse = function(res, status, message){
  res.status(status);
  res.json(message);
};

module.exports.teamsList = function(req, res){
  Team.find({}, function(err, result, stats){
    if(err){
      console.log('find error: ', err);
      sendJSONresponse(res, 404, err);
    }else{
      sendJSONresponse(res, 200, result);
    }
  });
};

module.exports.teamsCreate = function(req, res){
  console.log(req.body);
  var promises = validatePlayers(req);
  if(promises.length > 0){
    Promise.all(promises)
    .then(function(players){
      var notFoundError = false;
      players.forEach(function(player){
        if(!player){
          notFoundError = true;
          return;
        }
      });
      if(notFoundError){
        sendJSONresponse(res, 404, {
          "message" : "player id not found"
        });
      }else{
        createTeam(req, res);
      }
    })
    .catch(console.log);
  }else{
    createTeam(req, res);
  }
};

var createTeam = function(req, res){
  Team.create({
    name: req.body.name,
    players: req.body.players,
    city: req.body.city,
    level: req.body.level
  }, function(err, team){
    if(err){
      console.log(err);
      sendJSONresponse(res, 404, err);
    }else if(team){
      sendJSONresponse(res, 200, team);
    }
  });
};

var validatePlayers = function(req){
  var promises = [], players = req.body.players;
  if( players && players.length > 0){
    players.forEach(function(player){
      var promise = Player
        .findById(player)
        .exec();
        promises.push(promise);
    });
  }
  return promises;
};
