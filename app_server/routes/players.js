var express = require('express');
var router = express.Router();
var ctrlPlayers = require('../controllers/players');

router.get('/', ctrlPlayers.listPlayers);
router.get('/new', ctrlPlayers.viewCreatePlayer);
router.get('/create-player', ctrlPlayers.createPlayer);

module.exports = router;
