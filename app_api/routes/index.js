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
var ctrlOpponentRequest = require('../controllers/opponentRequests');
var ctrlUser = require('../controllers/users');
var ctrlPlayerRequest = require('../controllers/playerRequests');


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

/* Authentication API */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/* OpponentRequest API */
router.get('/opponent-requests', ctrlOpponentRequest.opponentRequestsPopulateList);
router.get('/opponent-requests/:requestid', auth, ctrlOpponentRequest.opponentRequestReadOne);
router.post('/opponent-requests', auth, ctrlOpponentRequest.opponentRequestsCreate);
router.put('/opponent-requests/:requestId', auth, ctrlOpponentRequest.opponentRequestsCreate);
router.delete('/opponent-requests', auth, ctrlOpponentRequest.deleteAll);
router.delete('/opponent-requests/:requestid', auth, ctrlOpponentRequest.opponentRequestsDeleteOne);

/* PlayerRequest API */
router.get('/player-requests', auth, ctrlPlayerRequest.playerRequestsList);
router.get('/player-requests/:requestid', auth, ctrlPlayerRequest.playerRequestReadOne);
router.post('/player-requests', auth, ctrlPlayerRequest.playerRequestCreateOne);
router.put('/player-requests/:requestid', auth, ctrlPlayerRequest.playerRequestUpdateOne);
router.delete('/player-requests', auth, ctrlPlayerRequest.playerRequestsDeleteAll);
router.delete('/player-requests/:requestid', auth, ctrlPlayerRequest.playerRequestsDeleteOne);

/* User API*/
router.get('/user/teams', auth, ctrlUser.teamsList);
router.get('/user/players', auth, ctrlUser.playersList);
router.get('/user/fields', auth, ctrlUser.fieldsList);
router.get('/user/opponent-requests', auth, ctrlUser.opponentRequestsList);

module.exports = router;
