var express = require('express');
var router = express.Router();
var ctrlTeams = require('../controllers/teams');

router.get('/', ctrlTeams.listTeams);

module.exports = router;
