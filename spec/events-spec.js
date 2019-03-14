const request = require("request");

const api = request.defaults({
    baseUrl: 'http://localhost:3000/api',
    json: true
  });

  describe('Event API Tests : ', function() {

    let authenticatedUserToken = '';
    let adminToken = '';
    let eventId = '';
    let adminId = '';
    let authUserId = '';
    let value = true;

    beforeAll(function(done) {
        api.post({
              url: "/login",
              body: {
                username: "Haneesha",
                password: "1234"
              }
    },function(err, res,body) {
        expect(res.statusCode).toBe(200);
          adminToken = body.token;
          adminId = body._id;
    });

    api.post({
        url: "/login",
        body: {
            username: "Jane",
            password: "1234"
        }
    }, function(err, res, body){
        expect(res.statusCode).toBe(200);
          authenticatedUserToken = body.token;   //is eventorganizer
          authUserId = body._id;
          api.get({
            url: '/events',
            headers: {
              'Authorization' : 'Bearer ' + authenticatedUserToken
            }
        },function(err,res,body){
            expect(res.statusCode).toBe(200);
            eventId = body[0]._id;  //eventId
            done();
        })
       
    })
  });

  //Create a new Event
  it("Create a Event Success", function(done){
    api.post({
        url: '/events',
        body:{
             name: "Event 3",
             description: "CS Event",
             location: "King Hall",
             starttime: "11/12/2018",
             endtime: "12/12/2018"

        },
        headers: {
          'Authorization': 'Bearer '+ authenticatedUserToken
        }
    }, function(err,res,body){
        expect(res.statusCode).toBe(200);
        expect(body).toBe("New Event Created");
          done();
    })

})

//failure case
it("Create a Event Failure", function(done){
    api.post({
        url: '/events',
        body:{
            name: "Event 4",
             description: "CS Event", //missing location
             starttime: "11/12/2018",
             endtime: "12/12/2018"

        },
        headers: {
          'Authorization': 'Bearer '+ authenticatedUserToken
        }
    }, function(err,res,body){
            expect(res.statusCode).toBe(400);
            expect(res.body.message, "Missing fields");
            done();
    })

})

  //Approve/Reject an Event
  it("Approve/Reject an Event Success", function(done){
    api.get({
        url: '/events/'+ eventId + '/approve/' + value,
        headers: {
          'Authorization': 'Bearer '+ adminToken
        }
    }, function(err,res,body){
        expect(res.statusCode).toBe(200);
        //expect(body.message).toBe("Event was Approved");
          done();
    })
})
//failure case
it("Approve/Reject an Event Failure", function(done){
    api.get({
        url: '/events/'+ eventId + '/approve/' + value,
        headers: {
          'Authorization': 'Bearer '+ authenticatedUserToken
        }
    }, function(err,res,body){
        expect(res.statusCode).toBe(401);
        expect(res.body.message, "Unauthorized Access");
          done();
    })
})

  //Add an attendee
  it("Add an Attendee", function(done){
  api.post({
    url: '/events/'+ eventId + '/addattendee/' + authUserId,
    headers: {
      'Authorization': 'Bearer '+ adminToken
    }
}, function(err,res,body){
    expect(res.statusCode).toBe(200);
      done();
})
});

  //Get all attendees
  it("Get All Attendees", function(done){
    api.get({
        url: '/events/attendees/'+ eventId,
        headers: {
          'Authorization': 'Bearer ' + adminToken
        }
    }, function(err,res,body){
        expect(res.statusCode).toBe(200);
          done();
    })
})

  
})