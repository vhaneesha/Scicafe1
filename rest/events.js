var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');
var createError = require("http-errors");

//Get All Events
router.get('/', (req, res, next) => {
    Event.find({}, (err,programs ) => {
      if (err) return next(err);
      res.json(programs);
    });
  });

module.exports = router;
//Create a new Event 
router.post('/', (req,res,next) => {
        console.log(req.user)
        User.getUserById(req.user.userid, (err, user) => {
            if(user.isEventOrganizer){
                if(req.user.isadmin){
                    Event.create({name: req.body.name, 
                        description: req.body.description,
                        location: req.body.location,
                        starttime: req.body.endtime,
                        endtime: req.body.endtime,
                        submitter: req.user.userid,
                        isapproved: true,
                        approvedby: req.user.userid
                         }, (err, event) =>{
                        if(err) return next(createError(400, "Missing Fields"));
                         res.send("New Event Created and Approved");
                })
                }
                else{
                    Event.create({name: req.body.name, 
                        description: req.body.description,
                        location: req.body.location,
                        starttime: req.body.endtime,
                        endtime: req.body.endtime,
                        submitter: req.user.userid
                        },(err) => {
                          if(err) return next(createError(400, "Missing Fields"));
                           res.send("New Event Created");
                        })  
                }
            }
            else{
                next(createError(401, "Unauthorized Access"));
            }
    })
});

//Approve/Reject an Event //value is Boolean

router.get('/:eventid/approve/:value', (req,res,next) => {
        eid = req.params.eventid;
        value = req.params.value;
        console.log(value)
        if(req.user.isadmin){
            if(value == "true"){
                Event.update({_id: eid}, {isapproved: true, reviewer : req.user.userid}, (err) => {
                if(err) return next(err);
                res.send('Event was Approved');
                })
        }
        else{
                Event.update({_id: eid}, {isapproved: false, reviewer : req.user.userid}, (err) => {
                if(err) return next(err);
                res.send('Event was Rejected');
                })
        }
     } else{
        next(createError(401, "Unauthorized Access"));
        }
        
});

//Add an Attendee to the Event  

router.post('/:eventid/addattendee/:userid', (req,res,next) => {
    eid = req.params.eventid
    uid = req.params.userid
        
        Event.getEventById(eid, (err, event) => {
            if(err) return next(err);
            if(event.isapproved == true){
                 if(req.user.isadmin){
                Event.update({_id:eid} , {$push: {attendees: uid}}, (err,event) =>{
                if(err) return next(err);
                    res.json(event)
                })
              }   
            else
                  next(createError(401, "Unauthorized Access"));
            }
            else res.json("Cannot add attendee, Event not approved")
        });
});


//Get all Attendees of the Event 

router.get('/attendees/:eventid', (req,res,next) => {
    id = req.params.eventid
    if(req.user.isadmin){
        Event.getEventById(id, (err, event) => {
            if(err) return next(err);
            res.json(event.attendees);
    })
}
    else
       next(createError(401, "Unauthorized Access"));
});

