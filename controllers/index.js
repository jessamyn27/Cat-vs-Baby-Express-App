const express = require('express');
const router = express.Router();
const User = require('../models/userSeeds');
// const Photo = require('../models/photoSeeds');

router.get('/', (req, res) => {

      res.render('index', {
        users: User[0]
        //grabbing info 'user' is a variable name in the ejs "User is what we just called the model (above) to require"  //     });
  });
});
module.exports = router;
