const express = require('express');
const router = express.Router();
// const User = require('../models/users');
// const Photo = require('..models/photos');
const User = require('../models/users');
const Photo = require('../models/photo');
// get route for users
router.get('/', (req, res) => {
  // User.find({}, (err, foundUsers) => {

      res.render('users/users.ejs', {
        session: req.session

        // users: User[0]
        //grabbing info 'user' is a variable name in the ejs "User is what we just called the model (above) to require"  //     });
  });
});

// 5b5792e4e5341e45e46a5319
// GET ROUTE for actual user
// /user/:id - Page displaying profile information (also our edit page)
router.get('/:id', async(req, res,err) => {
  try {
    const foundUser = await User.findById(req.params.id);
    console.log(foundUser.photos, 'this is found user in profile');
    if (foundUser.photos !== undefined) {


    const photoID = foundUser.photos;
    const foundPhotos = await Photo.findById(photoID);
    const allCats = foundPhotos.catPhotos;
    const allBabies = foundPhotos.babyPhotos;
    console.log(foundUser, 'FOUND UAERS' );

    res.render('users/users.ejs', {
      users: foundUser,
      cats: allCats,
      babies: allBabies,
      session: req.session

});
} else {
  res.render('users/users.ejs', {
    users: foundUser,
    session: req.session,
    cats: [],
    babies: []
  })
}
  } catch (err) {
    const foundUser = await User.findById(req.params.id);
  console.log(foundUser, 'ERRROR')  ;
    const findPhotos = await Photo.findById(foundUser.photos);
    console.log(findPhotos, 'photos?');
res.send(err)
}
})


// PUT ROUTE / EDIT
// /user/:id/update - (photos are not included in the update request , only profile information);

// $this->redirect($request->getReferer());
//
// var myRequest = new Request('flowers.jpg');
// var myReferrer = myRequest.referrer; // returns "about:client" by default

router.get('/:id/edit', (req, res) => {

  res.send('edit for profile page')
})

router.put('/:id/update', async(req, res,err) => {
  console.log('update profile info edit');
  const foundUser = await User.findById(req.params.id);
  if (req.body.profilePicture === '') {

  } else {
    foundUser.profilePicture = req.body.profilePicture;
   }

  foundUser.bio = req.body.bio;

  console.log(foundUser);
  await foundUser.save();
  res.redirect(`/users/${req.params.id}`);
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
