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
  // try {
  //   const foundUser =   await User.findOne({username: req.body.username});
    
  //   if (bcrypt.compareSync(req.body.password, foundUser.password)) {
  //     req.session.password = true;
  //     req.session.loggedIn = true;
  //     req.session.username = req.body.username;
  //     res.redirect('/home/index');
  //   } else {
  //     console.log('password was incorrect')
  //     res.redirect('/auth/login')
  //   }
  // } catch (err) {
  //    console.log( 'Username was not found');
  //     res.redirect('/auth/login')
  // }

  res.send(req.body);
});

// Register Request
router.post('/register', (req,res)=>{
  console.log('hitting the register post route');
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const newUser = {};
  newUser.username = req.body.username;
  newUser.password = passwordHash;
  // User.create(newUser, (err, createdUser)=>{
  //   req.session.username = createdUser.username;
  //   req.session.loggedIn = true;
  //   res.redirect('/home/index')
  // })
  res.send(newUser);
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