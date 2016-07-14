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
  res.render('player/players');
};
