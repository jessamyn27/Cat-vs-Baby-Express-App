var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const Photo = require('../models/photo')

// Login page
router.get('/login', (req, res) => {
  res.render('auth/login.ejs', {

});
});

// Register Page
router.get('/register', (req, res) => {
  res.render('auth/register.ejs')
})

// Login Request
router.post('/login', async (req, res, err) => {
  console.log('hitting the login request route')
  try {
    const foundUser = await User.findOne({
      userName: req.body.userName
    });

    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
// hide login button and show logout button
      req.session.password = true;
      req.session.loggedIn = true;
      req.session.userName = req.body.userName;
      console.log(req.session)
      res.redirect('/home');
    } else {
      console.log('password was incorrect')
      res.redirect('/auth/login')
    }
  } catch (err) {
    console.log('Username was not found');
    res.redirect('/auth/login')
  }

});

// Register Request
router.post('/register', (req, res) => {
  console.log('hitting the register post route');
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  console.log(req.body, 'req.body')
  const newUser = {};
  newUser.userName = req.body.userName;
  newUser.password = passwordHash;
  newUser.bio = req.body.bio;
  newUser.profilePicture = req.body.profilePicture;



  if (req.body.cutePhoto === 'catPhoto') {
    console.log('hitting cat creat')
    const createdPhoto = Photo.create({
      catPhotos: [{
        url: req.body.upload
      }]
    }, (err, createdPhoto) => {
      console.log(createdPhoto, 'created photos in mode')
      newUser.photos = createdPhoto._id;
      console.log(newUser, 'new user');
      User.create(newUser, (err, createdUser) => {
        console.log(createdUser, 'this is the created user in DB');
        console.log(req.session, 'req.session');
        req.session.userName = createdUser.username;
        req.session.loggedIn = true;
        res.redirect('/home')
      })

    });

  } else if (req.body.cutePhoto === 'babyPhoto') {
    console.log('hitting baby create')
    const createdPhoto = Photo.create({
      babyPhotos: [{
        url: req.body.upload
      }]
    }, (err, createdPhoto) => {
      console.log(createdPhoto, 'created photos')
      newUser.photos = createdPhoto._id;
      console.log(newUser, 'new user');
      User.create(newUser, (err, createdUser) => {
        console.log(createdUser, 'this is the created user in DB');
        console.log(req.session, 'req.session');
        req.session.userName = createdUser.username;
        req.session.loggedIn = true;
        res.redirect('/home')
      })

    });

  }






});

// LogOut
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('error destorying session');
    } else {
      res.redirect('/auth');
    }
  })
})





module.exports = router;
