module.exports.listPlayers = function(req, res){
  res.render('player/players',{title: 'Players'});
};

module.exports.viewCreatePlayer = function(req, res){
  res.render('player/create-player');
};

module.exports.createPlayer = function(req, res){
  res.render('player/players');
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
  res.render('player/players');
};
