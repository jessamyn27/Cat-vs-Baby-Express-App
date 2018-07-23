const express = require('express');
const router = express.Router();
// const Home = require('../models/home');
// const Photo = require('..models/photos');



// GET ROUTES

// /home/index - main
router.get('/', (req, res) => {
  // User.find({}, (err, foundUsers) => {
      res.render('home/home.ejs', {
  //       users: foundUsers
  //     });
  });
});

// /home/leaderBoard - Global Leaderboard
router.get('/leaderboard', (req, res) => {
  res.render('home/leaderboard.ejs', {

  });
});

// // /home/about - about page with description of rules
router.get('/about', (req, res) => {
  res.render('home/about.ejs', {

  });
});


module.exports = router;
