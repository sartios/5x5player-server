var mongoose = require('mongoose');
var log4js = require('log4js');
var Field = mongoose.model('Field');
var logger = log4js.getLogger('fields.js');

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

/* GET list of fields */
module.exports.fieldsList = function(req, res){
  Field.find({}, function(err, results, stats){
    if(err){
      logger.debug('find error: ', err);
      sendJSONresponse(res, 404, err);
    }else{
      sendJSONresponse(res, 200, results);
    }
  });
};

module.exports.fieldsCreate = function(req, res){
  logger.debug(req.body);
  Field.create({
    name: req.body.name,
    company: {name: req.body.company},
    size: req.body.size,
    user : req.payload
  }, function(err, field){
    if(err){
      logger.debug(err);
      sendJSONresponse(res, 400, err);
    }else{
      logger.debug(field);
      sendJSONresponse(res, 200, field);
    }
  });
};

module.exports.fieldsReadOne = function(req, res){
  logger.debug('Finding field details', req.params);
  if(req.params && req.params.fieldid){
    Field
      .findById(req.params.fieldid)
      .exec(function(err, field){
        if(!field){
          sendJSONresponse(res, 404,{
            "message": "fieldid not found"
          });
          return;
        }else if(err){
          logger.debug(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        logger.debug(field);
        sendJSONresponse(res, 200, field);
      });
  } else {
    logger.debug('No fieldid specified');
    sendJSONresponse(res, 404, {
      "message": "No fieldid in request"
    });
  }
};

module.exports.fieldsUpdateOne = function(req, res){
  if(!req.params.fieldid){
    sendJSONresponse(res, 404, {
      "message": "Not found, fieldid is required"
    });
    return;
  }
  Field
    .findById(req.params.fieldid)
    .select('-company')
    .exec(
      function(err, field){
        if(!field){
          sendJSONresponse(res, 404, {
            "message": "fieldid not found"
          });
          return;
        }else if(err){
          sendJSONresponse(res, 400, err);
          return;
        }
        field.name = req.body.name;
        field.size = req.body.size;
        field.modifiedOn = new Date();

        field.save(function(err, field){
          if(err){
            sendJSONresponse(res, 404, err);
          }else{
            sendJSONresponse(res, 200, field);
          }
        });
      }
    );
};

module.exports.fieldsDeleteOne = function(req, res){
  var fieldid = req.params.fieldid;
  if(fieldid){
    Field
      .findByIdAndRemove(fieldid)
      .exec(
        function(err, field){
          if(err){
            logger.debug(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          logger.debug('Field id ' + fieldid + ' deleted');
          sendJSONresponse(res, 204, null);
        });
  }else{
    sendJSONresponse(res, 404, {
      "message": "No fieldid"
    });
  }
};

module.exports.deleteAll = function(req, res){
  Field
    .remove({}, function(err, field){
      if(err){
        logger.debug(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      logger.debug('Fields collections have been deleted.');
      sendJSONresponse(res, 204, null);
    });
};
