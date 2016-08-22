var expect = require('chai').expect;
var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};

describe('PlayerReuqest API', function() {

    var team, field;

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
      it('should return player requests', function(){});
      it('should return 401 on authorized users', function(){});
    }

    function testPlayerRequestReadOne() {
      it('shoud return player request by its id', function(){});
      it('should return 404 on player request not found', function(){});
      it('should return 401 on authorized user', function(){});
      it('should return all player requests on missing id', function(){});
    }

    function testPlayerRequestCreateOne() {
      it('should create a new player request and return it', function(){});
      it('should not create a player request with unknown team', function(){});
      it('should not create a player request with unknown field', function(){});
      it('should return 401 for unauthorized user', function(){});
      it('should not create a player request with missing team', function(){});
      it('should not create a player request with missing field', function(){});
    }

    function testPlayerRequestUpdateOne() {
      it('should update a player request and return it', function(){});
      it('should not update a player request with unknown team', function(){});
      it('should not update a player request with unknown field', function(){});
      it('should return 401 for unauthorized user', function(){});
      it('should not update a player request with missing team', function(){});
      it('should not update a player request with missing field', function(){});
    }

    function testPlayerRequestsDeleteAll() {
      it('should delete all player requests', function(){});
      it('should return 401 for unauthorized user', function(){});
    }

    function testPlayerRequestsDeleteOne() {
      it('should delete player request specified by the id', function(){});
      it('should return 401 for unauthorized user', function(){});
    }

    // Function Implementations
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
      //requestOptions.url = apiOptions.server + '/api/player-requests';
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
