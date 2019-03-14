const request = require("request");

const api = request.defaults({
    baseUrl: 'http://localhost:3000/api',
    json: true
  });

describe('Login API Tests : ', function() {

        it('Login Success', function(done){
            api.post({
                url: '/login',
                body: {
                    username: 'Haneesha',
                    password: '1234'
                }

            }, function(err, res, body){
                expect(res.statusCode).toBe(200);
                expect(res.body.username).toBe("Haneesha");
                done();
            })
        })

        it('Failure due to Missing credentials', function(done){
            api.post({
                url: '/login',
                body:{
                    username: 'Haneesha'
                }
            }, function(err, res, body){
                expect(res.statusCode).toBe(400);
                expect(res.body.message, "Missing username and/or password");
                done();
            })
        })
});