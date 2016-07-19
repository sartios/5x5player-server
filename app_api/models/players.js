var mongoose = require('mongoose');

var availableDaySchema = new mongoose.Schema({
  day: {type: String, required: true},
  time: {type: String, required: true}
});

var playerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  position: {type: String, enum: ['Defense', 'Offense', 'Goalkeeper']},
  number: Number,
  availableDays: [availableDaySchema],
  createOn: {type: Date,"default": Date.now},
  modifiedOn: {type: Date,"default": Date.now}
});

mongoose.model('Player', playerSchema);
