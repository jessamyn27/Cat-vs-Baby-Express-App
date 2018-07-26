const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Photo = require('../models/photo');

// const Home = require('../models/home');
// const Photo = require('..models/photos');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// GET ROUTES

// /home/index - main
router.get('/', async (req, res, err) => {
  try {
    const foundPhotos = await Photo.find({
      babyPhotos: {
        $exists: true
      }
    });
    const allBabies = [];
    const allCats = [];

    foundPhotos.forEach((e) => {
      // console.log(e, 'first loop')
      e.babyPhotos.forEach((e) => {

        allBabies.push(e);
      });
    })

    foundPhotos.forEach((e) => {
      // console.log(e, 'first loop')
      e.catPhotos.forEach((e) => {

        allCats.push(e);
      });
    })

    // console.log(allBabies.length, 'All babies');
    // console.log(allCats.length, 'all cats');
    const randomCat = getRandomIntInclusive(0, allCats.length - 1);
    const randomBaby = getRandomIntInclusive(0, allBabies.length - 1);

    //  const allBabyPhotos = foundPhotos[2].babyPhotos;
    //  console.log(allBabyPhotos)
    res.render('home/home.ejs', {
      randomCat: allCats[randomCat],
      randomBaby: allBabies[randomBaby],
      session: req.session
    });
  } catch (err) {

  }
  // display random display of id in catPhotos against id in babyPhotos
});


// /home/leaderBoard - Global Leaderboard
router.get('/leaderboard', async (req, res, err) => {
  try {
    const allPhotos = await Photo.find({})
    const rankPhotos = []
    // console.log(allPhotos[1].catPhotos);
    for (var i = 0; i < allPhotos.length; i++) {
      // console.log(allPhotos[i]);
      for (var p = 0; p < allPhotos[i].catPhotos.length; p++) {
        rankPhotos.push(allPhotos[i].catPhotos[p]);
      }
    }
    for (var i = 0; i < allPhotos.length; i++) {
      // console.log(allPhotos[i]);
      for (var p = 0; p < allPhotos[i].babyPhotos.length; p++) {
        rankPhotos.push(allPhotos[i].babyPhotos[p]);
      }
    }
    rankPhotos.sort(function compareNumbers(a, b) {
      return b.rank - a.rank;

    })
    console.log(rankPhotos);
    res.render('home/leaderboard.ejs', {
    session: req.session, photos: rankPhotos
  });

  } catch (err) {

  }

});
// // /home/about - about page with description of rules
router.get('/about', (req, res) => {

  res.render('home/about.ejs', {
    session: req.session

  });
});

// route for photos being clicked and ranked (game)
router.put('/:photoID/:doc', async (req, res, err) => {
  try {
    let foundPhoto;
    console.log(req.params.doc);
    if (req.params.doc === 'cat') {
      foundPhoto = await Photo.findOne({
        'catPhotos': {
          $elemMatch: {
            _id: req.params.photoID
          }
        }
      })
    } else {
      foundPhoto = await Photo.findOne({
        'babyPhotos': {
          $elemMatch: {
            _id: req.params.photoID
          }
        }
      })
    }
console.log(foundPhoto, 'this is our cat photo');
if (req.params.doc === 'cat') {
  foundPhoto.catPhotos[0].rank++


} else if (req.params.doc === 'baby') {
  foundPhoto.babyPhotos[0].rank++

}
foundPhoto.save()
console.log(foundPhoto);

res.redirect('/home')
  } catch (err) {
    console.log(err, 'err for cat photo');

  }
// console.log('test photoID');






})


module.exports = router;
