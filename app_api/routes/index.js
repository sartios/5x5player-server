var express = require('express');
var router = express.Router();
var ctrlFields = require('../controllers/fields');
var ctrlPlayers = require('../controllers/players');
var ctrlTeams = require('../controllers/teams');


/* Fields API */
router.get('/fields', ctrlFields.fieldsList);
router.post('/fields', ctrlFields.fieldsCreate);
router.get('/fields/:fieldid', ctrlFields.fieldsReadOne);
router.put('/fields/:fieldid', ctrlFields.fieldsUpdateOne);
router.delete('/fields/:fieldid', ctrlFields.fieldsDeleteOne);


/* Players API */
router.get('/players', ctrlPlayers.playersList);
router.post('/players', ctrlPlayers.playersCreate);
router.delete('/players', ctrlPlayers.deleteAll);
router.get('/players/:playerid', ctrlPlayers.playersReadOne);
router.put('/players/:playerid', ctrlPlayers.playersUpdateOne);
router.delete('/players/:playerid', ctrlPlayers.playersDeleteOne);

/* Teams API*/
router.get('/teams', ctrlTeams.teamsList);
router.post('/teams', ctrlTeams.teamsCreate);

module.exports = router;
