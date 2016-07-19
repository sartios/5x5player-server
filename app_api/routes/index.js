var express = require('express');
var router = express.Router();
var ctrlFields = require('../controllers/fields');


router.get('/fields', ctrlFields.fieldsList);
router.post('/fields', ctrlFields.fieldsCreate);
router.get('/fields/:fieldid', ctrlFields.fieldsReadOne);
router.put('/fields/:fieldid', ctrlFields.fieldsUpdateOne);
router.delete('/fields/:fieldid', ctrlFields.fieldsDeleteOne);

module.exports = router;
