var expect = require('chai').expect;
var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};

describe('Users API', function(){
  var login, createTeam, createPlayer, createField, createOpponentRequest,
  clearTeams, clearFields, clearPlayers, clearOpponentRequests, requestOptions;

  // Login
  beforeEach(function(done){
    login(done);
  });

  // DELETE Teams
  beforeEach(function(done){
    clearTeams(done);
  });

  // DELETE Fields
  beforeEach(function(done){
    clearFields(done);
  });

  // DELETE Players
  beforeEach(function(done){
    clearPlayers(done);
  });

  // DELETE OpponentRequests
  beforeEach(function(done){
    clearOpponentRequests(done);
  });

  // POST Team
  beforeEach(function(done){
    createTeam(done);
  });

  // POST Field
  beforeEach(function(done){
    createField(done);
  });

  // POST Player
  beforeEach(function(done){
    createPlayer(done);
  });

  // POST OpponentRequest
  beforeEach(function(done){
    createOpponentRequest(done);
  });

  describe('GET /api/user/teams', function(){
    it('should return user teams', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/teams',
        method: 'GET',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        done();
      });
    });

    it('should not return user teams for unauthorized users', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/teams',
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('GET /api/user/players', function(){
    it('should return user players', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/players',
        method: 'GET',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        done();
      });
    });

    it('should not return user players for unauthorized users', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/players',
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('GET /api/user/fields', function(){
    it('should return user fields', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/fields',
        method: 'GET',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        done();
      });
    });

    it('should not return user fields for unauthorized users', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/fields',
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('GET /api/user/opponent-requests', function(){
    it('should return user opponent requests', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/opponent-requests',
        method: 'GET',
        json: {},
        qs: {},
        headers:{
          authorization: 'Bearer ' + apiOptions.token
        }
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        done();
      });
    });

    it('should not return user opponent requests for unauthorized users', function(done) {
      requestOptions = {
        url: apiOptions.server + '/api/user/opponent-requests',
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

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
      expect(response.statusCode).equal(200);
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

  createPlayer = function(done){
    var availableDays = [];
    availableDays.push({day: 'Monday', time: '21:00'});
    player = {
      name: 'Player 1',
      position: 'Defense',
      number: 12,
      availableDays: availableDays
    };
    requestOptions = {
      url: apiOptions.server + '/api/players',
      method: 'POST',
      json: player,
      qs: {},
      headers: {
        authorization: 'Bearer ' + apiOptions.token
      }
    };
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(200);
      player._id = body._id;
      done();
    });
  };

  createOpponentRequest = function(done){
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
      done();
    });
  };

  clearTeams = function(done){
    requestOptions = {
      url: apiOptions.server + '/api/teams',
      method: 'DELETE',
      json: {},
      qs: {},
      headers:{
        authorization: 'Bearer ' + apiOptions.token
      }
    };
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(204);
      done();
    });
  };

  clearFields = function(done){
    requestOptions = {
      url: apiOptions.server + '/api/fields',
      method: 'DELETE',
      json: {},
      qs: {},
      headers:{
        authorization: 'Bearer ' + apiOptions.token
      }
    };
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(204);
      done();
    });
  };

  clearPlayers = function(done){
    requestOptions = {
      url: apiOptions.server + '/api/players',
      method: 'DELETE',
      json: {},
      qs: {},
      headers:{
        authorization: 'Bearer ' + apiOptions.token
      }
    };
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(204);
      done();
    });
  };

  clearOpponentRequests = function(done){
    requestOptions = {
      url: apiOptions.server + '/api/opponent-requests',
      method: 'DELETE',
      json: {},
      qs: {},
      headers:{
        authorization: 'Bearer ' + apiOptions.token
      }
    };
    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(204);
      done();
    });
  };
});
