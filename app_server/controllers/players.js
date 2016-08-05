module.exports.listPlayers = function(req, res){
  res.render('player/players');
};

module.exports.viewCreatePlayer = function(req, res){
  res.render('player/create-player');
};

module.exports.createPlayer = function(req, res){
  res.render('player/players',{
    players:[{
      id: 1,
      name : 'Player 1',
      position : 'Defense',
      number : 7,
      availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
    },{
      id: 2,
      name : 'Player 2',
      position : 'Goalkeeper',
      number : 1,
      availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
    },{
      id: 3,
      name : 'Player 3',
      position : 'Offense',
      number : 10,
      availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
    }]
  });
};

module.exports.editPlayer = function(req, res){
  res.render('player/edit-player',{
    player:{
      name : 'Sample name',
      number : 8,
      days : ['day 1 - 21:00', 'day 2 - 19:00']
    }
  });
};

module.exports.updatePlayer = function(req, res){
  res.render('player/players',{
    players:[{
      id: 1,
      name : 'Player 1',
      position : 'Defense',
      number : 7,
      availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
    },{
      id: 2,
      name : 'Player 2',
      position : 'Goalkeeper',
      number : 1,
      availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
    },{
      id: 3,
      name : 'Player 3',
      position : 'Offense',
      number : 10,
      availableDays : ['Day 1 - 21:00','Day 2 - 20:00','Day 3 - 19:00']
    }]
  });
};
