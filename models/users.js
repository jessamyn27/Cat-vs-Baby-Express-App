const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // photos: [User.schema],
  profilePicture: String,
  bio: String,
  socialMedia: [{ twitter: String, facebook: String, instagram: String }],
});


module.exports = mongoose.model('User', userSchema);
