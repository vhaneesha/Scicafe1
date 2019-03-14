var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var createError = require("http-errors");
const User = require("../models/user");
const jwtSecret = "hello";


//User Login
router.post('/',(req,res,next) => {
  if (req.body.username == null || req.body.password == null) {
      next(createError(400, "Missing username and/or password"));
    } 
  User.getUsingUsername(req.body.username, (err, user) => {
          if(err) next(err); 
      if(user != null){
      bcrypt.compare(req.body.password, user.hash).then(equal => {
      if (!equal){
       return next(createError(404, "Incorrect password"));
      }
      else{
        res.json({
          token: jwt.sign(
            {
              userid: user._id,
              username: user.username,
              isadmin: user.isAdministrator,
              email: user.email
            },
            jwtSecret
          ),
          _id: user._id,
          username: user.username
          
        });
       }
  })
  }
  else{
      next(createError(404, "User not Found"));
  }
})
});



module.exports = router;
