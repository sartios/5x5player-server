var express = require('express');
var router = express.Router();
var ctrlFields = require('../controllers/fields');
var ctrlPlayers = require('../controllers/players');
var ctrlTeams = require('../controllers/teams');


/* Fields API */
router.get('/fields', ctrlFields.fieldsList);
router.get('/fields/:fieldid', ctrlFields.fieldsReadOne);
router.post('/fields', ctrlFields.fieldsCreate);
router.put('/fields/:fieldid', ctrlFields.fieldsUpdateOne);
router.delete('/fields/:fieldid', ctrlFields.fieldsDeleteOne);

/* Players API */
router.get('/players', ctrlPlayers.playersList);
router.get('/players/:playerid', ctrlPlayers.playersReadOne);
router.post('/players', ctrlPlayers.playersCreate);
router.put('/players/:playerid', ctrlPlayers.playersUpdateOne);
router.delete('/players/:playerid', ctrlPlayers.playersDeleteOne);
router.delete('/players', ctrlPlayers.deleteAll);

/* Teams API*/
router.get('/teams', ctrlTeams.teamsList);
router.get('/teams/:teamid', ctrlTeams.teamsReadOne);
router.post('/teams', ctrlTeams.teamsCreate);
router.put('/teams/:teamid', ctrlTeams.teamsUpdateOne);
router.put('/teams/:teamid/add-player', ctrlTeams.teamsAddPlayer);
router.put('/teams/:teamid/remove-player', ctrlTeams.teamsRemovePlayer);
router.delete('/teams', ctrlTeams.deleteAll);
router.delete('/teams/:teamid', ctrlTeams.teamsDeleteOne);


module.exports = router;
