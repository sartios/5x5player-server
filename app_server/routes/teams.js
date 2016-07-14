var express = require('express');
var router = express.Router();
var ctrlTeams = require('../controllers/teams');

router.get('/', ctrlTeams.listTeams);
router.get('/new', ctrlTeams.viewCreateTeam);
router.get('/create-team', ctrlTeams.createTeam);
router.get('/edit/:id', ctrlTeams.editTeam);
router.get('/update-team', ctrlTeams.updateTeam);

module.exports = router;
