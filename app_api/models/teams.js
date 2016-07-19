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
  level: {type: String, enum: ['Beginner', 'Advanced', 'Expert']}
});

mongoose.model('Team', teamSchema);
