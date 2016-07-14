var express = require('express');
var router = express.Router();
var ctrlFields = require('../controllers/fields');

router.get('/', ctrlFields.listFields);

module.exports = router;
