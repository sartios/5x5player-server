var mongoose = require('mongoose');

var opponentRequestSchema = new mongoose.Schema({
  team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
  field: {type: mongoose.Schema.Types.ObjectId, ref: 'Field'},
  date: {type: Date},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createOn: {type: Date, "default": Date.now},
  modifiedOn: {type: Date, "default": Date.now}
});

mongoose.model('OpponentRequest', opponentRequestSchema);
