const req = require("request");

const api = req.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true 
});

describe('Users API Test : ', function(){
   let jwttoken = '';

   beforeAll(function(done) {
      api.post({
        url: '/login',
        body: {
          username: 'Haneesha',
          password: '1234'

        }
      }, function(err,res,body){
          expect(res.statusCode).toBe(200);
          jwttoken = body.token;
          console.log(res);
          done();
      });

   });
   
   //User Registration Success
   it('User registration Success', function(done){
      api.post({
        url: "/users",
        body: {
        firstName : "Angeline",
        lastName : "Kale",
        position : "Student",
         organisation : "Mechanical",
         username: "Angie",
         password : "1234",
         email : "angie@gmail.com",
        },
        headers:{
          'Authorization' : 'Bearer ' + jwttoken
        }
      }, function(err,res,body){
        expect(res.statusCode).toBe(200);
        expect(body).toBe("New User Created");
        done();
      })
   })

   //User Registration Failure
   it('User registration Failed', function(done){
    api.post({
         url:'/users',
        body: {
          firstName : "Joey",
          lastName : "Smith",
          position : "Student",
          organisation : "Electrical",
          username: "Joey",
          password : "1234",
          //missing email
      },
      headers:{
        'Authorization' : 'Bearer ' + jwttoken
      }
    }, function(err,res,body){
      expect(res.statusCode).toBe(400);
      expect(res.body.message, "Missing Fields");
      done();
    })
   })

  });

