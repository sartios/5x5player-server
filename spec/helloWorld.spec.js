var request = require("request");
var base_url = "http://localhost:3000";

describe("Hello World Test", function(){

  describe("GET /", function(){
    it("returns status code 200", function(){
      request.get(base_url, function(err, response, body){
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

});
