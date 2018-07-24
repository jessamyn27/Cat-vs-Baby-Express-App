const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  catPhotos: [{url: {type: String, required: true}, description: String,rank:{type:Number, default: 0 }}],
  babyPhotos: [{url: {type: String, required: true}, description: String,rank: {type:Number, default:0}}]
});

module.exports = mongoose.model('Photo', photoSchema);