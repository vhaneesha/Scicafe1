var express = require('express');
var router = express.Router();
var Program = require('../models/program');
var createError = require("http-errors");
//Get All Programs 

router.get('/', (req, res, next) => {
    Program.find({}, (err,programs ) => {
      if (err) return next(err);
      res.json(programs);
    });
  });
//Get a Program by id 

router.get('/:_id', (req, res, next) => {
    id = req.params._id
    Program.findOne({_id: id}, (err,program) => {
      if (err) return next(err);
      res.json(program);
    });
  });

//Create a new Program 

router.post('/', (req,res,next) => {
    if(req.user.isadmin){
      Program.create({name: req.body.name, 
      description: req.body.description,
      fullName: req.body.fullName,
      }, (err) =>{
        if(err)  return next(createError(400, "Missing Fields"));
         res.send("New Program was created");
      })
    }
      else
        next(createError(401, "Unauthorized Access"));
      
  });

//Edit a Program

router.patch('/edit', (req,res,next) => {
    if(req.user.isadmin){
    Program.update({_id:req.body._id} , {name: req.body.name, fullName: req.body.fullName, description: req.body.description}, (err,event) =>{
        if(err) return next(err);
        res.send("Program was edited")
    })
  }
    else
      next(createError(401, "Unauthorized Access"));
    
    });

module.exports = router;