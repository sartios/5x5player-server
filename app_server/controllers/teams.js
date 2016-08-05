module.exports.listTeams = function(req, res){
    res.render('team/teams');
};

module.exports.viewCreateTeam = function(req, res){
    res.render('team/create-team');
};

module.exports.createTeam = function(req, res){
    res.render('team/teams',{
        teams:[{
            id: 1,
            name : 'Team 1',
            players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
            city : 'City 1',
            level : 'Beginner'
        },{
            id: 2,
            name : 'Team 2',
            players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
            city : 'City 1',
            level : 'Advanced'
        },{
            id: 3,
            name : 'Team 3',
            players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
            city : 'City 1',
            level : 'Expert'
        }]
    });
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
    res.render('team/teams',{
        teams:[{
            id: 1,
            name : 'Team 1',
            players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
            city : 'City 1',
            level : 'Beginner'
        },{
            id: 2,
            name : 'Team 2',
            players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
            city : 'City 1',
            level : 'Advanced'
        },{
            id: 3,
            name : 'Team 3',
            players : ['Player 1','Player 2','Player 3','Player 4','Player 5'],
            city : 'City 1',
            level : 'Expert'
        }]
    });
};
