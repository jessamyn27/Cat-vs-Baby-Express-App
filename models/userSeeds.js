const Photos = require('./photoSeeds');

const userSeeds = [{
  userName: 'timo',
  password: 'pass',
  photos: Photos[0],
  profilePictures: 'https://www.saberespractico.com/wp-content/uploads/2012/11/timo-organo-2.jpg',
  bio: ' This is some texty txt'
}]

module.exports = userSeeds;