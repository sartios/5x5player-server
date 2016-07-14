var express = require('express');
var router = express.Router();
var ctrlPlayers = require('../controllers/players');

router.get('/', ctrlPlayers.listPlayers);

module.exports = router;
