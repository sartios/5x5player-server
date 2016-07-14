var express = require('express');
var router = express.Router();
var ctrlFields = require('../controllers/fields');

router.get('/', ctrlFields.listFields);
router.get('/new', ctrlFields.viewCreateField);
router.get('/create-field', ctrlFields.createField);
router.get('/edit/:id', ctrlFields.editField);
router.get('/update-field', ctrlFields.updateField);

module.exports = router;
