const express = require('express');
const router = express.Router();
const User = require('../models/userSeeds');
const Photo = require('../models/photoSeeds');
// const Home = require('../models/home');
// const Photo = require('..models/photos');



// GET ROUTES

// /home/index - main
router.get('/', (req, res) => {
  // display random display of id in catPhotos against id in babyPhotos
  // User.find({}, (err, foundUsers) => {
      res.render('home/home.ejs', {
        users: User[0]
  //     });
  });
});

// /home/leaderBoard - Global Leaderboard
router.get('/leaderboard', (req, res) => {
  // display top 20 ranked photos for loop
  res.render('home/leaderboard.ejs', {

  });
});

// // /home/about - about page with description of rules
router.get('/about', (req, res) => {
  
  res.render('home/about.ejs', {

  });
});


module.exports = router;
