const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  catPhotos: [{url: {type: String, required: true}, description: String,rank: Number}],
  babyPhotos: [{url: {type: String, required: true}, description: String,rank: Number}]
});

module.exports = mongoose.model('Photo', photoSchema);