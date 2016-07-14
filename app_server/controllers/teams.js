module.exports.listTeams = function(req, res){
    res.render('team/teams', {});
};

module.exports.viewCreateTeam = function(req, res){
    res.render('team/create-team');
};

module.exports.createTeam = function(req, res){
    res.render('team/teams');
};

module.exports.editTeam = function(req, res){
    res.render('team/edit-team',{
        team:{
            name: 'Sample Team',
            players: ['player 1', 'player 2'],
            location: 'City 1',
            level: 'Advanced'
        }
    });
};

module.exports.updateTeam = function(req, res){
    res.render('team/teams');
};
