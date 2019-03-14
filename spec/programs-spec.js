const request = require("request");

const api = request.defaults({
    baseUrl: 'http://localhost:3000/api',
    json: true
  });

  describe('Program API Tests : ', function() {

    let regularUserToken = '';  
    let adminToken = '';
    let programId = '';
    let programId2 = '';

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
          
    })

    api.post({
        url: "/login",
        body: {
            username: "Jane",
            password: "1234"
        }
    }, function(err, res,body){
        expect(res.statusCode).toBe(200);
          regularUserToken = body.token;
           api.get(
            {
              url: '/programs',
              headers: {
                'Authorization': 'Bearer ' + regularUserToken
              }
            },
            function(err, res, body) {
              expect(res.statusCode).toBe(200);
              programId = body[0]._id;
              programId2 = body[1]._id;
              done();
            })
        })
    });

  //Get All programs
  it("Get All Programs", function(done) {
      api.get({
          url: '/programs',
          headers: {
            'Authorization' : 'Bearer '+ regularUserToken
          }
      },function(err,res,body){
          expect(res.statusCode).toBe(200);
          done();
      })
  })

  //Get a program by id
  it("Get a Program by ID", function(done){
      api.get({
          url: '/programs/'+ programId,
          headers: {
            'Authorization': 'Bearer '+ regularUserToken
          }
      }, function(err,res,body){
          expect(res.statusCode).toBe(200);
          expect(res.body.name).toBe('FYrE@ECST');
          expect(res.body.fullName).toBe('First-Year Experience Program at ECST');
          expect(res.body.description).toBe('Some description');
            done();
      })
  })

  //Create a program
  it("Create a program Success", function(done){
    api.post({
        url: '/programs',
        body:{
            name: "Program 4",
            fullName : "Full name Program 4",
            description: "Some description 4"
        },
        headers: {
          'Authorization' : 'Bearer '+ adminToken
        }
    }, function(err,res,body){
        expect(res.statusCode).toBe(200);
        expect(body).toBe("New Program was created");
          done();
    })
})

//failure case
it("Create a program Failure", function(done){
    api.post({
        url: '/programs',
        body:{
            name: "Program 5",
            fullName : "Full name Program 5",
            description: "Some description 5"
        },
        headers: {
          'Authorization' : 'Bearer '+ regularUserToken
        }
    }, function(err,res,body){
        expect(res.statusCode).toBe(401);
        expect(res.body.message, "Unauthorized Access");
          done();
    })
})
  //Edit a program
  it("Edit a program", function(done){
    api.patch({
        url: '/programs/edit/',
        body:{
            _id: programId2,
            name: "LSAMP",
            fullName : "LSAMP full name",
            description: "Adding extra description"
        },
        headers: {
          'Authorization' : 'Bearer ' + adminToken
        }
    }, function(err,res,body){
        expect(res.statusCode).toBe(200);
        expect(body).toBe("Program was edited")
          done();
    })
})

});