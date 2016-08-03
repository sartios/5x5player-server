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
router.get('/teams/:teamId', ctrlTeams.teamsReadOne);
router.post('/teams', ctrlTeams.teamsCreate);
router.put('/teams/:teamId', ctrlTeams.teamsUpdateOne);
router.put('teams/:teamId/add-player/:playerId', ctrlTeams.teamsAddPlayer);
router.put('teams/:teamId/remove-player/:playerId', ctrlTeams.teamsRemovePlayer);
router.delete('/teams', ctrlTeams.deleteAll);
router.delete('/teams/:teamId', ctrlTeams.teamsDeleteOne);


module.exports = router;
