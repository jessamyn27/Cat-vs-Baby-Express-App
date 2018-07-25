const express = require('express');

const router = express.Router();
const User = require('../models/users');
const Photos = require('../models/photo');
// const PhotoSeeds = require('../models/photoSeeds');

router.get('/babies/showall', async(req,res,err)=>{
  try {
    const allBabies = await Photos.find({babyPhotos: {$exists: true}});
    console.log(allBabies, 'found babies');
    res.render('photos/allBabies.ejs', {
      photos: allBabies
    })
  } catch (err) {
    console.log('hitting err')
    res.send(err);
  }
  // res.render('photos/allBabies.ejs', {
  //     photos: PhotoSeeds
  // })
});

router.get('/cats/showall', async (req,res,err)=>{
  try {
    const allCats = await Photos.find({catPhotos: {$exists: true}});
    res.render('photos/allCats.ejs', {
      photos: allCats
    })
  } catch (err){
    res.send(err);
  }
  // res.render('photos/allCats.ejs', {photos: PhotoSeeds});
});

router.post('/:id', async (req,res, err)=>{
  try {
      const foundUser = await User.findById(req.params.id);
      console.log(foundUser);
  

  } catch(err) {

  }  

  res.send(req.body);
})

router.delete('/delete/:id', (req,res)=>{
  res.send('delete route')
})

module.exports = router;
