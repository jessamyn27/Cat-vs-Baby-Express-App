const mongoose = require('mongoose');

const Photos = require('./photo');

const userSchema = mongoose.Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photos: [Photos.schema],
  profilePicture:  String,
  bio: {type: String, maxlength: 150},
  socialMedia: [{twitter:String, facbook:String, intagram: String}]
})

module.exports = mongoose.model('User', userSchema);
