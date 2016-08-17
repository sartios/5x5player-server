var mongoose = require('mongoose');

var availableDaySchema = new mongoose.Schema({
  day: {type: String},
  time: {type: String}
});

var playerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  position: {type: String, enum: ['Defense', 'Offense', 'Goalkeeper']},
  number: Number,
  availableDays: [availableDaySchema],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createOn: {type: Date,"default": Date.now},
  modifiedOn: {type: Date,"default": Date.now}
});

mongoose.model('Player', playerSchema);
