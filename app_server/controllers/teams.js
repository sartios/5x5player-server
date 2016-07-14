module.exports.listTeams = function(req, res){
    res.render('team/teams', {});
};

module.exports.viewCreateTeam = function(req, res){
    res.render('team/create-team');
};

module.exports.createTeam = function(req, res){
    res.render('team/teams');
};
