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


  describe('POST /api/fields', function(){
    it('should create a new field', function(done){
      var postdata = {
        name: 'Field 1',
        company: 'Company 1',
        size: 12
      };
      var requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: "POST",
        json: postdata,
        qs:{}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.name).to.equal(postdata.name);
        expect(body.company.name).to.equal(postdata.company);
        expect(body.size).to.equal(postdata.size);
        expect(body.modifiedOn).not.to.be.undefined;
        expect(body.createOn).not.to.be.undefined;
        expect(body._id).not.to.be.undefined;
        done();
      });
    });
  });

  describe('PUT /api/fields/:fieldid', function(){
    var postdata, requestOptions, field;
    beforeEach(function(done){
      postdata = {
        name: 'Field 1',
        company: 'Company 1',
        size: 12
      };
      requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: "POST",
        json: postdata,
        qs:{}
      };
      request(requestOptions, function(err, response, body){
        field = body;
        done();
      });
    });

    it('should update the field', function(done){
      postdata = {
        name: 'Field 1 modified',
        size: 22
      };
      requestOptions = {
        url: apiOptions.server + '/api/fields/' + field._id,
        method: "PUT",
        json: postdata,
        qs:{}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.name).to.equal(postdata.name);
        expect(body.size).to.equal(postdata.size);
        expect(body.modifiedOn).not.to.equal(field.modifiedOn);
        expect(body.createOn).to.equal(field.createOn);
        expect(body._id).to.equal(field._id);
        done();
      });
    });
  });

  describe('DELETE /api/fields/:fieldid', function(){
    var postdata, requestOptions, fieldsCount, field;
    beforeEach(function(done){
      postdata = {
        name: 'Field 1',
        company: 'Company 1',
        size: 12
      };
      requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: "POST",
        json: postdata,
        qs:{}
      };
      request(requestOptions, function(err, response, body){
        field = body;
      });

      requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: "GET",
        json: {},
        qs:{}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        fieldsCount = body.length;
        done();
      });
    });

    it('should delete the field', function(done){
      requestOptions = {
        url: apiOptions.server + '/api/fields/' + field._id,
        method: "DELETE",
        json: {},
        qs:{}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });

      requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: "GET",
        json: {},
        qs:{}
      };
      request(requestOptions, function(err, response, body){
        var actualCount = body.length;
        var expectedCount = fieldsCount - 1;
        expect(actualCount).to.equal(expectedCount);
        done();
      });
    });
  });

});
