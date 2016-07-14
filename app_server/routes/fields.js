var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('field/fields',{});
});

module.exports = router;
