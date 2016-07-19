var mongoose = require('mongoose');
var Field = mongoose.model('Field');

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

/* GET list of fields */
module.exports.fieldsList = function(req, res){
  Field.find({}, function(err, results, stats){
    var fields;
    if(err){
      console.log('find error: ', err);
      sendJSONresponse(res, 404, err);
    }else{
      //fields = buildFieldList(req, res, results, stats);
      sendJSONresponse(res, 200, results);
    }
  });
};

module.exports.fieldsCreate = function(req, res){
  console.log(req.body);
  Field.create({
    name: req.body.name,
    company: {name: req.body.company},
    size: req.body.size
  });
};

module.exports.fieldsReadOne = function(req, res){
  console.log('Finding field details', req.params);
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
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(field);
        sendJSONresponse(res, 200, field);
      });
  } else {
    console.log('No fieldid specified');
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
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log('Field id ' + fieldid + ' deleted');
          sendJSONresponse(res, 204, null);
        });
  }else{
    sendJSONresponse(res, 404, {
      "message": "No fieldid"
    });
  }
};
