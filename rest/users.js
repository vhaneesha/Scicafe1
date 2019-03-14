var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require("bcrypt");
var createError = require("http-errors");

//Get all Users 
router.get('/', (req, res, next) => {
   if(req.user.isadmin){
  User.find({},{hash: false}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
 }
 else{
    next(createError(401, "Unauthorized Access"));
  }
});


//User Registration 
router.post('/', (req,res,next) => {
  const createdhash = bcrypt.hashSync(req.body.password, 10);
  User.create({firstName: req.body.firstName, 
    lastName: req.body.lastName,
    position: req.body.position,
    organisation: req.body.organisation,
    username: req.body.username,
    hash: createdhash,
    email: req.body.email,
    title: req.body.title,
    isEventOrganizer: req.body.isEventOrganizer,
    isRewardProvider: req.body.isRewardProvider,
    isAdministrator: req.body.isAdministrator }, (err) => {
      if(err) return next(createError(400, "Missing Fields"));
       res.send("New User Created");
})
});

module.exports = router;