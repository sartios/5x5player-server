var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
  name: {type: String, required: true}
});

var fieldSchema = new mongoose.Schema({
  name: {type: String, required: true},
  company: companySchema,
  size: Number,
  coords: {
    type: [Number],
    index: '2dsphere'
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createOn: {type: Date,"default": Date.now},
  modifiedOn: {type: Date,"default": Date.now},
});

mongoose.model('Field', fieldSchema);
