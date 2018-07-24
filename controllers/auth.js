var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

// Login page 
router.get('/login', (req,res)=>{
  res.render('auth/login.ejs')
});

// Register Page
router.get('/register', (req,res)=>{
  res.render('auth/register.ejs')
})

// Login Request 
router.post('/login', async (req,res, err)=>{
  console.log('hitting the login request route')
  try {
    const foundUser =   await User.findOne({userName: req.body.userName});
    
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
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
     console.log( 'Username was not found');
      res.redirect('/auth/login')
  }

});

// Register Request
router.post('/register', (req,res)=>{
  console.log('hitting the register post route');
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const newUser = {};
  newUser.userName = req.body.userName;
  newUser.password = passwordHash;
  console.log(newUser, 'new user');
  User.create(newUser, (err, createdUser)=>{
    console.log(createdUser);
    console.log(req.session, 'req.session');
    req.session.userName = createdUser.username;
    req.session.loggedIn = true;
    res.redirect('/home')
  })
  
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