const express = require('express');
const router = express.Router();
// const User = require('../models/users');
// const Photo = require('..models/photos');
const User = require('../models/userSeeds');
const Photo = require('../models/photoSeeds');
// get route for users
router.get('/', (req, res) => {
  // User.find({}, (err, foundUsers) => {

      res.render('users/users.ejs', {
        users: User[0]
        //grabbing info 'user' is a variable name in the ejs "User is what we just called the model (above) to require"  //     });
  });
});

// GET ROUTE for actual user
// /user/:id - Page displaying profile information (also our edit page)
router.get('/:id', (req, res) => {
  res.send('page displaying profile info / also our edit page')
});

// PUT ROUTE / EDIT
// /user/:id/update - (photos are not included in the update request , only profile information);

// $this->redirect($request->getReferer());
//
// var myRequest = new Request('flowers.jpg');
// var myReferrer = myRequest.referrer; // returns "about:client" by default

router.get('/:id/edit', (req, res) => {

  res.send('edit for profile page')
})

router.put('/:id/update', (req, res) => {
  console.log('update profile info edit');
  res.redirect(req.getReferer());
});

router.post('/', (req, res) => {
  res.send(req.body);
});

// DELETE ROUTE
// /user/delete/:id - Delete user account ( Removes all photos owned)
router.delete('/:id', (req, res) => {
  res.redirect('/users')
});




module.exports = router;
