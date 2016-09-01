var ObjectId = require('mongodb').ObjectId;
var expect = require('chai').expect;
var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};

describe('PlayerReuqest API', function() {

    var team, field, playerRequest;

    beforeEach(login);
    beforeEach(dropDB);
    beforeEach(createTeam);
    beforeEach(createField);

    describe('GET /api/player-requests', testPlayerRequestsList);
    describe('GET /api/player-request/:requestid', testPlayerRequestReadOne);
    describe('POST /api/player-requests', testPlayerRequestCreateOne);
    describe('PUT /api/player-requests/:requestid', testPlayerRequestUpdateOne);
    describe('DELETE /api/player-requests', testPlayerRequestsDeleteAll);
    describe('DELETE /api/player-requests/:requestid', testPlayerRequestsDeleteOne);

    function testPlayerRequestsList() {
      beforeEach(createPlayerRequest);
      it('should return player requests', getPlayerRequestsTest);
      it('should return player requests with team name', getPlayerRequestsPopulateTeamTest);
      it('should return player requests with field name', getPlayerRequestsPopulateFieldTest);
      it('should return 401 on unauthorized users', getUnauthorizedPlayerRequestsTest);
    }

    function testPlayerRequestReadOne() {
      beforeEach(createPlayerRequest);
      it('shoud return player request by its id', getPlayerRequestsByIdTest);
      it('should return 404 on player request not found', getPlayerRequestsByIdUnknownIdTest);
      it('should return 401 on authorized user', getPlayerRequestsByIdUnauthorizedTest);
      it('should return all player requests on missing id', getPlayerRequestsByIdMissingIdTest);
      it('should return all player requests on undefined id', getPlayerRequestsByIdUndefinedIdTest);
    }

    function testPlayerRequestCreateOne() {
      it('should create a new player request and return it', createPlayerRequestTest);
      it('should not create a player request with unknown team', createPlayerRequestUnknownTeamTest);
      it('should not create a player request with unknown field', createPlayerRequestUnknownFieldTest);
      it('should return 401 for unauthorized user', createPlayerRequestUnauthorizedTest);
      it('should not create a player request with missing team', createPlayerRequestMissingTeamTest);
      it('should not create a player request with missing field', createPlayerRequestMissingFieldTest);
    }

    function testPlayerRequestUpdateOne() {
      beforeEach(createPlayerRequest);
      it('should update a player request and return it', updatePlayerRequestTest);
      it('should not update a player request with unknown team', updatePlayerRequestWithUnknownTeamTest);
      it('should not update a player request with unknown field', updatePlayerRequestWithUnknownFieldTest);
      it('should return 401 for unauthorized user', updatePlayerRequestUnauthorizedTest);
      it('should not update a player request with missing team', updatePlayerRequestMissingTeamTest);
      it('should not update a player request with missing field', updatePlayerRequestMissingFieldTest);
    }

    function testPlayerRequestsDeleteAll() {
      beforeEach(createPlayerRequest);
      it('should delete all player requests', deleteAllPlayerRequestsTest);
      it('should return 401 for unauthorized user', deleteAllPlayerRequestsUnauthorizedTest);
    }

    function testPlayerRequestsDeleteOne() {
      beforeEach(createPlayerRequest);
      it('should delete player request specified by the id', deletePlayerRequestByIdTest);
      it('should return 401 for unauthorized user', deletePlayerRequestByIdUnauthorizedTest);
    }

    // Function Implementations

    // GET /api/player-requests
    function getPlayerRequestsTest(){
      loadGetPlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        expect(body[0].team._id).to.equal(playerRequest.team._id);
        expect(body[0].field._id).to.equal(playerRequest.field._id);
        expect(body[0].date).to.equal(playerRequest.date.toISOString());
        expect(body[0].numberOfPlayers).to.equal(playerRequest.numberOfPlayers);
        expect(body[0].createOn).to.equal(playerRequest.createOn);
        expect(body[0].modifiedOn).to.equal(playerRequest.modifiedOn);
        expect(body[0]._id).to.equal(playerRequest._id);
        expect(body[0].user).to.equal(playerRequest.user);
      });
    }

    function getPlayerRequestsPopulateTeamTest(){
      loadGetPlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        expect(body[0].team._id).to.equal(playerRequest.team._id);
        expect(body[0].team.name).to.equal(playerRequest.team.name);
        expect(body[0].field._id).to.equal(playerRequest.field._id);
        expect(body[0].field.name).to.equal(playerRequest.field.name);
        expect(body[0].date).to.equal(playerRequest.date.toISOString());
        expect(body[0].numberOfPlayers).to.equal(playerRequest.numberOfPlayers);
        expect(body[0].createOn).to.equal(playerRequest.createOn);
        expect(body[0].modifiedOn).to.equal(playerRequest.modifiedOn);
        expect(body[0]._id).to.equal(playerRequest._id);
        expect(body[0].user).to.equal(playerRequest.user);
      });
    }

    function getPlayerRequestsPopulateFieldTest(){
      loadGetPlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        expect(body[0].team._id).to.equal(playerRequest.team._id);
        expect(body[0].team.name).to.equal(playerRequest.team.name);
        expect(body[0].field._id).to.equal(playerRequest.field._id);
        expect(body[0].field.name).to.equal(playerRequest.field.name);
        expect(body[0].date).to.equal(playerRequest.date.toISOString());
        expect(body[0].numberOfPlayers).to.equal(playerRequest.numberOfPlayers);
        expect(body[0].createOn).to.equal(playerRequest.createOn);
        expect(body[0].modifiedOn).to.equal(playerRequest.modifiedOn);
        expect(body[0]._id).to.equal(playerRequest._id);
        expect(body[0].user).to.equal(playerRequest.user);
      });
    }

    function getUnauthorizedPlayerRequestsTest(done){
      loadGetPlayerRequestOptions(playerRequest._id);
      delete requestOptions.headers;
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    }

    // GET /api/player-request/:requestid
    function getPlayerRequestsByIdTest(done){
      loadGetPlayerRequestByIdOptions(playerRequest._id);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.team).to.equal(playerRequest.team._id);
        expect(body.date).to.equal(playerRequest.date.toISOString());
        expect(body.numberOfPlayers).to.equal(playerRequest.numberOfPlayers);
        expect(body.createOn).to.equal(playerRequest.createOn);
        expect(body.modifiedOn).to.equal(playerRequest.modifiedOn);
        expect(body._id).to.equal(playerRequest._id);
        expect(body.user).to.equal(playerRequest.user);
        done();
      });
    }

    function getPlayerRequestsByIdUnknownIdTest(done){
      loadGetPlayerRequestByIdOptions(new ObjectId());
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function getPlayerRequestsByIdUnauthorizedTest(done){
      loadGetPlayerRequestByIdOptions(playerRequest._id);
      delete requestOptions.headers;
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    }

    function getPlayerRequestsByIdMissingIdTest(done){
      loadGetPlayerRequestByIdOptions('');
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        done();
      });
    }

    function getPlayerRequestsByIdUndefinedIdTest(done){
      loadGetPlayerRequestByIdOptions(undefined);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        expect(body.message).to.equal('PlayerRequest with ID: undefined did not found');
        done();
      });
    }

    // POST /api/player-requests
    function createPlayerRequestTest(done){
      loadPlayerRequest();
      loadCreatePlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.team).to.equal(playerRequest.team._id);
        expect(body.date).to.equal(playerRequest.date.toISOString());
        expect(body.numberOfPlayers).to.equal(playerRequest.numberOfPlayers);
        expect(body.createOn).to.not.be.undefined;
        expect(body.modifiedOn).to.not.be.undefined;
        expect(body._id).to.not.be.undefined;
        expect(body.user).to.not.be.undefined;
        done();
      });
    }

    function createPlayerRequestUnknownTeamTest(done){
      loadPlayerRequest();
      team._id = new ObjectId();
      playerRequest.team = team;
      loadCreatePlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function createPlayerRequestUnknownFieldTest(done){
      loadPlayerRequest();
      field._id = new ObjectId();
      playerRequest.field = field;
      loadCreatePlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function createPlayerRequestUnauthorizedTest(done){
      loadPlayerRequest();
      loadCreatePlayerRequestOptions();
      delete requestOptions.headers;
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    }

    function createPlayerRequestMissingTeamTest(done){
      loadPlayerRequest();
      delete playerRequest.team;
      loadCreatePlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function createPlayerRequestMissingFieldTest(done){
      loadPlayerRequest();
      delete playerRequest.field;
      loadCreatePlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    // PUT /api/player-requests/:requestid

    function updatePlayerRequestTest(done){
      playerRequest.date = new Date();
      loadUpdatePlayerRequestOptions(playerRequest._id, playerRequest);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.team).to.equal(playerRequest.team._id);
        expect(body.date).to.equal(playerRequest.date.toISOString());
        expect(body.numberOfPlayers).to.equal(playerRequest.numberOfPlayers);
        expect(body.createOn).to.equal(playerRequest.createOn);
        expect(body.modifiedOn).to.not.equal(playerRequest.modifiedOn);
        expect(body._id).to.equal(playerRequest._id);
        expect(body.user).to.equal(playerRequest.user);
        done();
      });
    }

    function updatePlayerRequestWithUnknownTeamTest(done){
      loadPlayerRequest();
      team._id = new ObjectId();
      playerRequest.team = team;
      loadUpdatePlayerRequestOptions(playerRequest._id, playerRequest);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function updatePlayerRequestWithUnknownFieldTest(done){
      loadPlayerRequest();
      field._id = new ObjectId();
      playerRequest.field = field;
      loadUpdatePlayerRequestOptions(playerRequest._id, playerRequest);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function updatePlayerRequestUnauthorizedTest(done){
      loadPlayerRequest();
      loadUpdatePlayerRequestOptions(playerRequest._id, playerRequest);
      delete requestOptions.headers;
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    }

    function updatePlayerRequestMissingTeamTest(done){
      loadPlayerRequest();
      delete playerRequest.team;
      loadUpdatePlayerRequestOptions(playerRequest._id, playerRequest);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function updatePlayerRequestMissingFieldTest(done){
      loadPlayerRequest();
      delete playerRequest.field;
      loadUpdatePlayerRequestOptions(playerRequest._id, playerRequest);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    // DELETE /api/player-requests
    function deleteAllPlayerRequestsTest(done){
      loadDeletePlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });
      loadGetPlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(0);
        done();
      });
    }

    function deleteAllPlayerRequestsUnauthorizedTest(done){
      loadDeletePlayerRequestOptions();
      delete requestOptions.headers;
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
      });
      loadGetPlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        done();
      });
    }

    // DELETE /api/player-requests/:requestid
    function deletePlayerRequestByIdTest(done){
      loadDeletePlayerRequestOptions(playerRequest._id);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });
      loadGetPlayerRequestByIdOptions(playerRequest._id);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    }

    function deletePlayerRequestByIdUnauthorizedTest(done){
      loadDeletePlayerRequestOptions(playerRequest._id);
      delete requestOptions.headers;
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
      });
      loadGetPlayerRequestByIdOptions(playerRequest._id);
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body._id).to.equal(playerRequest._id);
        done();
      });
    }

    // Common Requests

    function createPlayerRequest(done){
      loadPlayerRequest();
      loadCreatePlayerRequestOptions();
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        playerRequest._id = body._id;
        playerRequest.createOn = body.createOn;
        playerRequest.modifiedOn = body.modifiedOn;
        playerRequest.user = body.user;
        //expect(body.team).to.equal(playerRequest.team._id);
        //expect(body.date).to.equal(playerRequest.date);
        //expect(body.numberOfPlayers).to.equal(playerRequest.numberOfPlayers);
        //expect(body.createOn).to.not.be.undefined;
        //expect(body.modifiedOn).to.not.be.undefined;
        //expect(body._id).to.not.be.undefined;
        //expect(body.user).to.not.be.undefined;
        done();
      });
    }

    // Load request options

    var loadDeletePlayerRequestOptions = function(){
      requestOptions = {
        url: apiOptions.server + '/api/player-requests',
        method: 'DELETE',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
    };

    var loadUpdatePlayerRequestOptions = function(requestid, request){
      requestOptions = {
        url: apiOptions.server + '/api/player-requests/' + requestid,
        method: 'PUT',
        json: request,
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
    };

    var loadGetPlayerRequestOptions = function(){
      requestOptions = {
        url: apiOptions.server + '/api/player-requests',
        method: 'GET',
        json: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
    };

    var loadGetPlayerRequestByIdOptions = function(requestid){
      requestOptions = {
        url: apiOptions.server + '/api/player-requests/' + requestid,
        method: 'GET',
        json: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
    };

    var loadCreatePlayerRequestOptions = function(){
      requestOptions = {
        url: apiOptions.server + '/api/player-requests',
        method: 'POST',
        json: playerRequest,
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
    };

    var loadPlayerRequest = function(){
      playerRequest = {
        team: team,
        field: field,
        date: new Date(),
        numberOfPlayers: 5
      };
    };

    // Global Functions

    function login(done){
      requestOptions = {
        url: apiOptions.server + '/api/login',
        method: 'POST',
        json:{
          email: 'sartios@hotmail.com',
          password: 'pa55w0rd'
        },
        qs: {}
      };

      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        apiOptions.token = body.token;
        done();
      });
    }

    function dropDB(done){
      requestOptions = {
        url: apiOptions.server + '/api/fields',
        method: 'DELETE',
        json:{},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });
      requestOptions.url = apiOptions.server + '/api/teams';
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });
      requestOptions.url = apiOptions.server + '/api/player-requests';
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
        done();
      });
    }

    function createTeam(done){
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
    }

    function createField(done){
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
    }
});
