var expect = require('chai').expect;
var request = require('request');
var ObjectId = require('mongodb').ObjectId;

var apiOptions = {
  server: 'http://localhost:3000'
};

describe('OpponentRequest API', function(){
  var team, field, requestOptions, opponentRequest,updateField,
  initDeleteAllRequest,
  initGetAllRequest,
  initPutRequest,
  initDeleteOneRequest,
  initPostRequest,
  initGetOneRequest,
  login, createTeam, createField;

  // Login
  beforeEach(function(done){
    login(done);
  });

  // POST Team
  beforeEach(function(done){
    createTeam(done);
  });

  // POST Field
  beforeEach(function(done){
    createField(done);
  });

  describe('POST /api/opponent-requests', testPostOpponentRequests);
  describe('GET /api/opponent-requests/:requestid', testGetOpponentRequestById);
  describe('PUT /api/opponent-requests/:requestId', testUpdateOpponentRequest);
  describe('DELETE /api/opponent-requests', testDeleteAllRequests);
  describe('DELETE /api/opponent-requests/:requestid', testDeleteOpponentRequest);

  function testPostOpponentRequests(){
    it('should create an opponent request', createOpponentRequestTest);
    it('should return 401 for un authenticated users', createOpponentRequestUnauthorizedTest);
    it('should not create an opponent request with an unknown team', createOpponentRequestWithUnknownTeamTest);
    it('should not create an opponent request without a team', createOpponentRequestWithoutTeam);
    it('should not create an opponent request with an unknown field', createOpponentRequestWithUnknownField);
    it('should not create an opponent request without a field', createOpponentRequestWithFieldTest);
    it('should not create an opponent request without a user', createOpponentRequestWithoutUser);
  }

  function testGetOpponentRequestById(){
    beforeEach(createOpponentRequest);
    it('should return an opponent request', getOpponentRequestByIdTest);
    it('should return 401 for unathenticated users', getUnauthorizedOpponentRequestsTest);
    it('should 404 when request id does not belong to a request',getUnknownOpponentRequestTest);
    it('should all requests when request id does not exist', getOpponentRequestsWithoutIdTest);
  }

  function testUpdateOpponentRequest(done){
    beforeEach(createOpponentRequest);
    beforeEach(createFieldToUpdate);
    it('should update the opponent request', updateOpponentRequestTest);
    it('should return 401 for unauthenticated users', unauthorizedUpdateOpponentRequestTest);
    it('should return 404 for opponent request without field', updateOpponentRequestWithoutFieldTest);
    it('should return 404 for opponent request without data', updateOpponentRequestWithoutDataTest);
  }

  function testDeleteAllRequests(){
   beforeEach(createOpponentRequest);
   beforeEach(specifyThatRequestsExist);
   it('should delete all opponent requests', deleteAllRequestsTest);
   it('should return 401 for unathenticated users', unauthorizedDeleteAllRequestsTest);
 }

  function testDeleteOpponentRequest(){
    beforeEach(createOpponentRequest);
    it('should delete the opponents request', deleteOpponentRequestTest);
    it('should return 401 for unauthorized users', unauthorizedDeleteOpponentRequestTest);
  }

  // Tests implementations
  // POST /api/opponent-requests
  function createOpponentRequestTest(done){
    opponentRequest = {
      team: team,
      field: field,
      date: new Date()
    };
    initPostRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(200);
      expect(body._id).not.to.be.undefined;
      done();
    });
  }

  function createOpponentRequestUnauthorizedTest(done){
    opponentRequest = {
      team: team,
      field: field,
      date: new Date()
    };
    initPostRequest();
    delete requestOptions.headers;
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(401);
      done();
    });
  }

  function createOpponentRequestWithUnknownTeamTest(done){
    team._id = new ObjectId();
    opponentRequest = {
      team: team,
      field: field,
      date: new Date()
    };
    initPostRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(404);
      done();
    });
  }

  function createOpponentRequestWithoutTeam(done){
    opponentRequest = {
      field: field,
      date: new Date()
    };
    initPostRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(404);
      done();
    });
  }

  function createOpponentRequestWithUnknownField(done){
    field._id = new ObjectId();
    opponentRequest = {
      team: team,
      field: field,
      date: new Date()
    };
    initPostRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(404);
      done();
    });
  }

  function createOpponentRequestWithFieldTest(done){
    opponentRequest = {
      team: team,
      date: new Date()
    };
    initPostRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(404);
      done();
    });
  }

  function createOpponentRequestWithoutUser(done){
    opponentRequest = {
      team: team,
      field: field,
      date: new Date()
    };
    initPostRequest();
    delete requestOptions.headers;
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(401);
      done();
    });
  }

  //GET /api/opponent-requests/:requestid
  function createOpponentRequest(done){
    opponentRequest = {
      team: team,
      field: field,
      date: new Date()
    };
    initPostRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(200);
      opponentRequest._id = body._id;
      opponentRequest.createOn = body.createOn;
      opponentRequest.modifiedOn = body.modifiedOn;
      done();
    });
  }

  function getOpponentRequestByIdTest(done){
    initGetOneRequest();
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
  }

  function getUnauthorizedOpponentRequestsTest(done){
    initGetOneRequest();
    delete requestOptions.headers;
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(401);
      done();
    });
  }

  function getUnknownOpponentRequestTest(done){
   initGetOneRequest();
   requestOptions.url =  apiOptions.server + '/api/opponent-requests/' + new ObjectId();
   request(requestOptions, function(err, response, body){
     expect(response.statusCode).to.equal(404);
     done();
   });
 }

 function getOpponentRequestsWithoutIdTest(done){
   initGetOneRequest();
   requestOptions.url =  apiOptions.server + '/api/opponent-requests/';
   request(requestOptions, function(err, response, body){
     expect(response.statusCode).to.equal(200);
     expect(body.length).to.not.be.empty;
     done();
   });
 }

 // PUT /api/opponent-requests/:requestId
 function createFieldToUpdate(done){
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
 }

 function updateOpponentRequestTest(done){
   opponentRequest.field = updateField;
   opponentRequest.date = new Date();
   initPutRequest();
   request(requestOptions, function(err, response, body){
     expect(response.statusCode).to.equal(200);
     expect(opponentRequest.field._id).to.equal(body.field);
     //expect(opponentRequest.date).to.equal(body.date);
     expect(opponentRequest.modifiedOn).to.not.equal(body.modifiedOn);
     expect(body.user).to.not.be.undefined;
     done();
   });
 }

 function unauthorizedUpdateOpponentRequestTest(done){
  opponentRequest.field = updateField;
  opponentRequest.date = new Date();
  initPutRequest();
  delete requestOptions.headers;
  request(requestOptions, function(err, response, body){
    expect(response.statusCode).to.equal(401);
    done();
  });
}

function updateOpponentRequestWithoutFieldTest(done){
 opponentRequest.field = '';
 opponentRequest.date = new Date();
 initPutRequest();
 request(requestOptions, function(err, response, body){
   expect(response.statusCode).to.equal(404);
   done();
 });
}

function updateOpponentRequestWithoutDataTest(done){
 opponentRequest.field = updateField;
 opponentRequest.date = '';
 initPutRequest();
 request(requestOptions, function(err, response, body){
   expect(response.statusCode).to.equal(404);
   done();
 });
}

  // DELETE /api/opponent-requests

  function specifyThatRequestsExist(done) {
    initGetAllRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(200);
      var countRequests = body.length;
      expect(countRequests).to.not.equal(0);
      done();
    });
  }

  function deleteAllRequestsTest(done){
    initDeleteAllRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(204);
    });
    initGetAllRequest();
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(200);
      expect(body.length).to.equal(0);
      done();
    });
  }

  function unauthorizedDeleteAllRequestsTest(done){
   initDeleteAllRequest();
   delete requestOptions.headers;
   request(requestOptions, function(err, response, body){
     expect(response.statusCode).to.equal(401);
     done();
   });
 }

 // DELETE /api/opponent-requests/:requestid

 function deleteOpponentRequestTest(done){
  initDeleteOneRequest();
  request(requestOptions, function(err, response, body){
    expect(response.statusCode).to.equal(204);
  });
  initGetOneRequest();
  request(requestOptions, function(err, response, body){
    expect(response.statusCode).to.equal(404);
    done();
  });
}

function unauthorizedDeleteOpponentRequestTest(done){
  initDeleteOneRequest();
  delete requestOptions.headers;
  request(requestOptions, function(err, response, body){
    expect(response.statusCode).to.equal(401);
    done();
  });
}

  // Common methods

  login = function(done){
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
  };

  createTeam = function(done){
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
  };

  createField = function(done){
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
  };

  // Init requests sections

  initDeleteAllRequest = function(){
    requestOptions = {
      url: apiOptions.server + '/api/opponent-requests',
      method: 'DELETE',
      json: {},
      qs: {},
      headers: {
        authorization: 'Bearer ' + apiOptions.token
      }
    };
  };

  initGetAllRequest = function(){
    requestOptions = {
      url: apiOptions.server + '/api/opponent-requests',
      method: 'GET',
      json: {},
      qs: {},
      headers: {
        authorization: 'Bearer ' + apiOptions.token
      }
    };
  };

  initPutRequest = function(){
    requestOptions = {
      url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
      method: 'PUT',
      json: opponentRequest,
      qs: {},
      headers:{
        authorization: 'Bearer ' + apiOptions.token
      }
    };
  };

  initDeleteOneRequest = function(){
    requestOptions = {
      url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
      method: 'DELETE',
      json: {},
      qs: {},
      headers: {
        authorization : "Bearer " + apiOptions.token
      }
    };
  };

  initPostRequest = function(){
    requestOptions = {
      url: apiOptions.server + '/api/opponent-requests',
      method: 'POST',
      json: opponentRequest,
      qs: {},
      headers: {
        authorization: 'Bearer ' + apiOptions.token
      }
    };
  };

  initGetOneRequest = function(){
    requestOptions = {
      url: apiOptions.server + '/api/opponent-requests/' + opponentRequest._id,
      method: 'GET',
      json: {},
      qs: {},
      headers:{
        authorization: 'Bearer ' + apiOptions.token
      }
    };
  };

});
