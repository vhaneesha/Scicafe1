var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource'); // /users this is the response 
});*/
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  User.find( (err, users) => {
     res.render('users', {title: 'Users', users: users});
  });
});*/

module.exports = router;

