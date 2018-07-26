const express = require('express');

const router = express.Router();
const User = require('../models/users');
const Photos = require('../models/photo');
// const PhotoSeeds = require('../models/photoSeeds');

router.get('/babies/showall', async (req, res, err) => {
  try {
    const allBabies = await Photos.find({
      babyPhotos: {
        $exists: true
      }
    });
    console.log(allBabies, 'found babies');
    res.render('photos/allBabies.ejs', {
      photos: allBabies,
      session: req.session

    })
  } catch (err) {
    console.log('hitting err')
    res.send(err);
  }
  // res.render('photos/allBabies.ejs', {
  //     photos: PhotoSeeds
  // })
});

router.get('/cats/showall', async (req, res, err) => {
  try {
    const allCats = await Photos.find({
      catPhotos: {
        $exists: true
      }
    });
    res.render('photos/allCats.ejs', {
      photos: allCats,
      session: req.session

    })
  } catch (err) {
    res.send(err);
  }

});

router.post('/:id', async (req, res, err) => {
  try {
    const foundUser = await User.findById(req.params.id);
    console.log(foundUser, 'found user');
    console.log(foundUser.photos);
    console.log(req.body.url, 'REQ BODY');
    if (foundUser.photos === undefined) {
      if (req.body.cutePhoto === 'catPhoto') {
        console.log('hitting cat creat')
        const createdPhoto = await Photos.create({
          catPhotos: [{
            url: req.body.url
          }]
        })
        // console.log('testtetstetste')
        // console.log(createdPhoto, 'created photos in mode')
        foundUser.photos = createdPhoto._id;
        // console.log(foundUser, 'found user with id?');
        foundUser.save();
        res.redirect(`/users/${req.params.id}`);
      } else if (req.body.cutePhoto === 'babyPhoto') {
        // console.log('hitting baby creat')
        const createdPhoto = await Photos.create({
          babyPhotos: [{
            url: req.body.url
          }]
        })
        // console.log('testtetstetste')
        // console.log(createdPhoto, 'created photos in mode')
        foundUser.photos = createdPhoto._id;
        // console.log(foundUser, 'found user with id?');
        foundUser.save();
        res.redirect(`/users/${req.params.id}`);
      }




    } else {
      const photoCon = await Photos.findById(foundUser.photos);
      console.log(photoCon, 'init photocon');
      if (req.body.cutePhoto === 'catPhoto') {
        photoCon.catPhotos.push(req.body);
        photoCon.save();
        console.log(photoCon, 'photo con after');
      } else if (req.body.cutePhoto === 'babyPhoto') {
        photoCon.babyPhotos.push(req.body);
        photoCon.save();
        console.log(photoCon);
      }
      res.redirect(`/users/${req.params.id}`);
    }

  } catch (err) {

  }


})

//5b58e31c05bd9b687f499ef2
router.delete('/delete/:doc/:userid/:id', async (req, res, err) => {
  try {
    let foundPhoto;
    if (req.params.doc === 'cat') {
      foundPhoto = await Photos.findOne({
        'catPhotos': {
          $elemMatch: {
            _id: req.params.id
          }
        }
      })
    } else {
      foundPhoto = await Photos.findOne({
        'babyPhotos': {
          $elemMatch: {
            _id: req.params.id
          }
        }
      })
    }
    // const foundPhoto = await Photos.findOne({'catPhotos.id': req.params.id})
    // const foundPhoto = await Photos.find({})

    console.log(req.params.id, 'id for photo');
    console.log(foundPhoto, 'found photo');
    if (req.params.doc === 'cat') {
      foundPhoto.catPhotos.splice(0, 1);
    } else {
      foundPhoto.babyPhotos.splice(0, 1);
    }
    console.log(foundPhoto);
    foundPhoto.save();
    res.redirect(`/users/${req.params.userid}`);
  } catch (err) {
    console.log(err);
  }

  res.send('delete route')
})

module.exports = router;
