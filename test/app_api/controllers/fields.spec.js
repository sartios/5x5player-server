var expect = require("chai").expect;
var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};

describe('Fields API', function(){

  describe('GET /api/fields', function(){

    it('should return all fields', function(done){
      var requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: "GET",
        json: {},
        qs:{}
      };
      request(requestOptions, function(err, response, body){
          expect(response.statusCode).to.equal(200);
        done();
      });

    });
  });

});
