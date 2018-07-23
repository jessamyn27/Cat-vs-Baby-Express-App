const express = require('express');

const router = express.Router();

const Photos = require('../models/photo');

router.get('/babies/showall', async(req,res,err)=>{
  // try {
  //   const allBabies = await Photos.find({babyPhotos: {$exists: true}});

  //   res.render('/photos/allBabies.ejs', {
  //     babyPhotos: allBabies
  //   })
  // } catch (err) {
  //   res.send(err);
  // }
  res.render('photos/allBabies.ejs')
});

router.get('/cats/showall', async (req,res,err)=>{
  // try {
  //   const allCats = await Photos.find({catPhotos: {$exists: true}});
  //   res.render('/photos/allCats.ejs', {
  //     catPhotos: allCats
  //   })
  // } catch (err){
  //   res.send(err);
  // }
  res.render('photos/allCats.ejs');
});

router.post('/', (req,res)=>{
  res.send('Post route for photos')
})

router.delete('/delete/:id', (req,res)=>{
  res.send('delete route')
})

module.exports = router;