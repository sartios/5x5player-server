var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var ctrlFields = require('../controllers/fields');
var ctrlPlayers = require('../controllers/players');
var ctrlTeams = require('../controllers/teams');
var ctrlAuth = require('../controllers/authentication');


/* Fields API */
router.get('/fields', auth, ctrlFields.fieldsList);
router.get('/fields/:fieldid', auth, ctrlFields.fieldsReadOne);
router.post('/fields', auth, ctrlFields.fieldsCreate);
router.put('/fields/:fieldid', auth, ctrlFields.fieldsUpdateOne);
router.delete('/fields/:fieldid', auth, ctrlFields.fieldsDeleteOne);
router.delete('/fields', auth, ctrlFields.deleteAll);

/* Players API */
router.get('/players', auth, ctrlPlayers.playersList);
router.get('/players/:playerid', auth, ctrlPlayers.playersReadOne);
router.post('/players', auth, ctrlPlayers.playersCreate);
router.put('/players/:playerid', auth, ctrlPlayers.playersUpdateOne);
router.delete('/players/:playerid', auth, ctrlPlayers.playersDeleteOne);
router.delete('/players', auth, ctrlPlayers.deleteAll);

/* Teams API*/
router.get('/teams', auth, ctrlTeams.teamsList);
router.get('/teams/:teamid', auth, ctrlTeams.teamsReadOne);
router.post('/teams', auth, ctrlTeams.teamsCreate);
router.put('/teams/:teamid', auth, ctrlTeams.teamsUpdateOne);
router.put('/teams/:teamid/add-player', auth, ctrlTeams.teamsAddPlayer);
router.put('/teams/:teamid/remove-player', auth, ctrlTeams.teamsRemovePlayer);
router.delete('/teams', auth, ctrlTeams.deleteAll);
router.delete('/teams/:teamid', auth, ctrlTeams.teamsDeleteOne);

/* Authentication */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
