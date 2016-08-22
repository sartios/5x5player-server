var mongoose = require('mongoose');

var playerRequestSchema = new mongoose.Schema({
  team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
  field: {type: mongoose.Schema.Types.ObjectId, ref: 'Field'},
  date: {type: Date, required: true},
  numberOfPlayers: {type: Number, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createOn: {type: Date, "default": Date.now},
  modifiedOn: {type: Date, "default": Date.now}
});

mongoose.model('PlayerRequest', playerRequestSchema);
