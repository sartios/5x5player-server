var express = require('express');
var router = express.Router();
var ctrlTeams = require('../controllers/teams');
var ctrlPlayers = require('../controllers/players');
var ctrlFields = require('../controllers/fields');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET team page. */
router.get('/teams', ctrlTeams.listTeams);
router.get('/teams/new', ctrlTeams.viewCreateTeam);
router.get('/teams/create-team', ctrlTeams.createTeam);
router.get('/teams/edit/:id', ctrlTeams.editTeam);
router.get('/teams/update-team', ctrlTeams.updateTeam);

/* GET player page. */
router.get('/players', ctrlPlayers.listPlayers);
router.get('/players/new', ctrlPlayers.viewCreatePlayer);
router.get('/players/create-player', ctrlPlayers.createPlayer);
router.get('/players/edit/:id', ctrlPlayers.editPlayer);
router.get('/players/update-player', ctrlPlayers.updatePlayer);

/* GET field page. */
router.get('/fields', ctrlFields.listFields);
router.get('/fields/new', ctrlFields.viewCreateField);
router.get('/fields/create-field', ctrlFields.createField);
router.get('/fields/edit/:id', ctrlFields.editField);
router.get('/fields/update-field', ctrlFields.updateField);

module.exports = router;
