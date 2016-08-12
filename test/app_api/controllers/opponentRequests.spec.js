var expect = require('chai').expect;
var request = require('request');
var ObjectId = require('mongodb').ObjectId;

var apiOptions = {
  server: 'http://localhost:3000'
};

describe('OpponentRequest API', function(){
  var team, field, requestOptions, opponentRequest;

  // Login
  beforeEach(function(done){
    requestOptions = {
      url: apiOptions.server + '/api/login',
      method: 'POST',
      json: {
        email: 'sartios@hotmail.com',
        password: 'pa55w0rd'
      },
      qs: {}
    };
    request(requestOptions, function(err, response, body){
      apiOptions.token = body.token;
      done();
    });
  });

  // POST Team
  beforeEach(function(done){
    team = {
      name: 'Team 1',
      players: [],
      city: {
        city: 'Thessaloniki',
        coords: [50, 60]
      },
      level: 'Beginner'
    };
    requestOptions = {
      url: apiOptions.server + '/api/teams',
      method: 'POST',
      json: team,
      qs: {},
      headers: {
        authorization: 'Bearer ' + apiOptions.token
      }
    };
    request(requestOptions, function(err, response, body){
      team._id = body._id;
      team.modifiedOn = body.modifiedOn;
      team.createOn = body.createOn;
      done();
    });
  });

  // POST Field
  beforeEach(function(done){
    field = {
      name: 'Field 1',
      company: 'Company 1',
      size: 12
    };
    requestOptions = {
      url: apiOptions.server + '/api/fields',
      method: 'POST',
      json: field,
      qs: {},
      headers: {
        authorization: 'Bearer ' + apiOptions.token
      }
    };
    request(requestOptions, function(err, response, body){
      field._id = body._id;
      done();
    });
  });

  describe('POST /api/opponent-requests',function(){
    it('should create an opponent request', function(done){
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body._id).not.to.be.undefined;
        done();
      });
    });

    it('should return 401 for un authenticated users', function(done){
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });

    it('should not create an opponent request with an unknown team', function(done){
      team._id = new ObjectId();
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should not create an opponent request without a team', function(done){
      opponentRequest = {
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should not create an opponent request with an unknown field', function(done){
      field._id = new ObjectId();
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should not create an opponent request without a field', function(done){
      opponentRequest = {
        team: team,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should not create an opponent request without a user', function(done){
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });

  });

  describe('GET /api/opponent-requests/:requestid', function(){
    beforeEach(function(done){
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        opponentRequest._id = body._id;
        opponentRequest.createOn = body.createOn;
        opponentRequest.modifiedOn = body.modifiedOn;
        done();
      });
    });

    it('should return an opponent request', function(done){
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'GET',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(opponentRequest._id).to.equal(body._id);
        expect(opponentRequest.team._id).to.equal(body.team);
        expect(opponentRequest.field._id).to.equal(body.field);
        expect(opponentRequest.createOn).to.equal(body.createOn);
        expect(opponentRequest.modifiedOn).to.equal(body.modifiedOn);
        expect(body.user).to.not.be.undefined;
        done();
      });
    });

    it('should return 401 for unathenticated users', function(done){
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });

    it('should 404 when request id does not belong to a request', function(done){
      var requestId = new ObjectId();
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + requestId,
        method: 'GET',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should all requests when request id does not exist', function(done){
      var requestId = '';
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + requestId,
        method: 'GET',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.not.be.empty;
        done();
      });
    });
  });

  describe('PUT /opponent-requests/:requestId', function(done){
    var updateField;
    beforeEach(function(done){
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        opponentRequest._id = body._id;
        opponentRequest.createOn = body.createOn;
        opponentRequest.modifiedOn = body.modifiedOn;
        done();
      });
    });

    beforeEach(function(done){
      updateField = {
        name: 'Field 2',
        company: 'Company 2',
        size: 12
      };
      requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: 'POST',
        json: updateField,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        updateField._id = body._id;
        done();
      });
    });

    it('should update the opponent request', function(done){
      opponentRequest.field = updateField;
      opponentRequest.date = new Date();
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'PUT',
        json: opponentRequest,
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(opponentRequest.field._id).to.equal(body.field);
        //expect(opponentRequest.date).to.equal(body.date);
        expect(opponentRequest.modifiedOn).to.not.equal(body.modifiedOn);
        expect(body.user).to.not.be.undefined;
        done();
      });
    });

    it('should return 401 for unauthenticated users', function(done){
      opponentRequest.field = updateField;
      opponentRequest.date = new Date();
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'PUT',
        json: opponentRequest,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });

    it('should return 404 for opponent request without field', function(done){
      opponentRequest.field = '';
      opponentRequest.date = new Date();
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'PUT',
        json: opponentRequest,
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should return 404 for opponent request without data', function(done){
      opponentRequest.field = updateField;
      opponentRequest.date = '';
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'PUT',
        json: opponentRequest,
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('DELETE /opponent-requests', function(){
    var countRequests;
    beforeEach(function(done){
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        opponentRequest._id = body._id;
        opponentRequest.createOn = body.createOn;
        opponentRequest.modifiedOn = body.modifiedOn;
        done();
      });
    });
    beforeEach(function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'GET',
        json: {},
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        countRequests = body.length;
        expect(countRequests).to.not.equal(0);
        done();
      });
    });

    it('should delete all opponent requests', function(done){
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'DELETE',
        json: {},
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });

      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'GET',
        json: {},
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(0);
        done();
      });
    });

    it('should return 401 for unathenticated users', function(done){
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'DELETE',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('DELETE /api/opponent-requests/:requestid', function(){

    beforeEach(function(done){
      opponentRequest = {
        team: team,
        field: field,
        date: new Date()
      };
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests',
        method: 'POST',
        json: opponentRequest,
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        opponentRequest._id = body._id;
        opponentRequest.createOn = body.createOn;
        opponentRequest.modifiedOn = body.modifiedOn;
        done();
      });
    });

    it('should delete the opponents request', function(done){
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'DELETE',
        json: {},
        qs: {},
        headers: {
          authorization : "Bearer " + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });

      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'GET',
        json: {},
        qs: {},
        headers: {
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should return 401 for unauthorized users', function(done){
      requestOptions = {
        url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
        method: 'DELETE',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

});
