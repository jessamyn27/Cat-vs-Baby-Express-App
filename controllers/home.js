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
router.get('/', async(req, res,err) => {
  try{
   const foundPhotos = await Photo.find({babyPhotos: {$exists: true}});
   const allBabies = [];
   const allCats = [];
    
   foundPhotos.forEach((e)=>{
     console.log(e, 'first loop')
     e.babyPhotos.forEach((e)=>{ 
       
       allBabies.push(e);
     });
    })

    foundPhotos.forEach((e)=>{
      console.log(e, 'first loop')
      e.catPhotos.forEach((e)=>{ 
        
        allCats.push(e);
      });
     })

   console.log(allBabies.length, 'All babies');
   console.log(allCats.length, 'all cats');
    const randomCat = getRandomIntInclusive(0,allCats.length-1);
    const randomBaby = getRandomIntInclusive(0,allBabies.length-1);

    



   
  //  const allBabyPhotos = foundPhotos[2].babyPhotos;
  //  console.log(allBabyPhotos)
   res.render('home/home.ejs', {
     randomCat: allCats[randomCat],
     randomBaby: allBabies[randomBaby]
   });
  }

   catch (err) {

  }
  // display random display of id in catPhotos against id in babyPhotos
 
});

// /home/leaderBoard - Global Leaderboard
router.get('/leaderboard', (req, res) => {
  // display top 20 ranked photos for loop
  // res.render('home/leaderboard.ejs', {
  //   users: User[0]

  // });
});

// // /home/about - about page with description of rules
router.get('/about', (req, res) => {

  // res.render('home/about.ejs', {

  // });
});


module.exports = router;
