var mongoose = require('mongoose');


var locationSchema = new mongoose.Schema({
  city: {type: String},
  coords: {
    type: [Number],
    index: '2dsphere'
  }
});

var teamSchema = new mongoose.Schema({
  name: {type: String, required: true},
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  city: locationSchema,
  level: {type: String, enum: ['Beginner', 'Advanced', 'Expert']},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createOn: {type: Date,"default": Date.now},
  modifiedOn: {type: Date,"default": Date.now}
});

mongoose.model('Team', teamSchema);
