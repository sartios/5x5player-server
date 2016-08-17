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
    level: req.body.level,
    user: req.payload
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

module.exports.teamsReadOne = function(req, res){
  console.log('Finding team details', req.params);
  if(req.params && req.params.teamid){
    Team
      .findById(req.params.teamid)
      .exec(function(err, team){
        if(!team){
          sendJSONresponse(res, 404, {
            "message": "teamid not found"
          });
          return;
        }else if(err){
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(team);
        sendJSONresponse(res, 200, team);
      });
  }else{
    console.log('No teamid specified');
    sendJSONresponse(res, 404, {
      "message": "No teamid in request"
    });
  }
};

module.exports.teamsUpdateOne = function(req, res){
  if(!req.params.teamid){
    sendJSONresponse(res, 404, {
      "message": "Not found, teamid is required"
    });
    return;
  }
  Team
    .findById(req.params.teamid)
    .select('-players')
    .exec(function(err, team){
      if(!team){
        sendJSONresponse(res, 404, {
          "message": "teamid not found"
        });
        return;
      }else if(err){
        sendJSONresponse(res, 400, err);
        return;
      }
      team.city = req.body.city;
      team.level = req.body.level;
      team.modifiedOn = new Date();

      team.save(function(err, team){
        if(err){
          sendJSONresponse(res, 404, err);
        }else{
          console.log(team);
          sendJSONresponse(res, 200, team);
        }
      });
    });
};

module.exports.teamsAddPlayer = function(req, res){
  if(!req.params.teamid){
    sendJSONresponse(res, 404, {
      "message": "Not found, teamid and playerid required"
    });
    return;
  }
  Team
    .findById(req.params.teamid)
    .exec(function(err, team){
      if(!team){
        sendJSONresponse(res, 404, {
          "message": "teamid not found"
        });
        return;
      }else if(err){
        console.log('error: ', err);
        sendJSONresponse(res, 404, {
          "message": "teamid not found"
        });
        return;
      }
      console.log('Add player: ' , req.body.playerid);
      team.players.push(req.body.playerid);
      team.modifiedOn = new Date();
      team.save(function(err, team){
        if(err){
          console.log('error: ', err);
          sendJSONresponse(res, 404, err);
        }else{
          console.log('Updated: ', team);
          sendJSONresponse(res, 200, team);
        }
      });
    });
};

module.exports.teamsRemovePlayer = function(req, res){
  if(!req.params.teamid && !req.body.playerid){
    sendJSONresponse(res, 404, {
      "message": "Not found, teamid and playerid required"
    });
    return;
  }
  Team
    .findById(req.params.teamid)
    .exec(function(err, team){
      if(!team){
        sendJSONresponse(res, 404, {
          "message": "teamid not found"
        });
        return;
      }else if(err){
        sendJSONresponse(res, 404, {
          "message": "teamid not found"
        });
        return;
      }
      var playerIndex = -1;
      team.players.forEach(function(player, index){
        if(player == req.body.playerid){
          playerIndex = index;
          return;
        }
      });
      if(playerIndex > -1){
        team.players.splice(playerIndex, 1);
      }
      team.modifiedOn = new Date();
      team.save(function(err, team){
        if(err){
          sendJSONresponse(res, 404, err);
        }else{
          sendJSONresponse(res, 200, team);
        }
      });
    });
};

module.exports.teamsDeleteOne = function(req, res){
  var teamid = req.params.teamid;
  if(teamid){
    Team
      .findByIdAndRemove(teamid)
      .exec(function(err, team){
        if(err){
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log('Team id ' + teamid + ' deleted');
        sendJSONresponse(res, 204, null);
      });
  }else{
    sendJSONresponse(res, 404, {
      "message" : "No teamid"
    });
  }
};

module.exports.deleteAll = function(req, res){
  Team
    .remove({},function(err, team){
      if(err){
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log('Teams collections have been deleted');
      sendJSONresponse(res, 204, null);
    });
};
