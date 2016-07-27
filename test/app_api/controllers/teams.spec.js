var expect = require('chai').expect;
var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};

describe('Teams API', function(){
  describe('POST /api/teams', function(){
    var players = [], requestOptions, fakeTeamId;
    beforeEach(function(done){
      players = [];
      var player = {
        name: 'Player 1',
        position: 'Defense',
        number: 12
      };
      requestOptions = {
        url: apiOptions.server + '/api/players',
        method: 'POST',
        json: player,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        players.push(body._id);
      });
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        players.push(body._id);
        done();
      });
    });
    it('should create a team without players', function(done){
      var team = {
        name: 'Team 1',
        players: [],
        city: {
          city: 'Thessaloniki',
          coords:[50.000,60.000]
        },
        level: 'Beginner'
      };
      requestOptions = {
        url: apiOptions.server + '/api/teams',
        method: 'POST',
        json: team,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.name).to.equal(team.name);
        expect(body.players).to.deep.equal(team.players);
        expect(body.city.city).to.equal(team.city.city);
        expect(body.city.coords).to.deep.equal(team.city.coords);
        expect(body.level).to.equal(team.level);
        expect(body._id).not.to.be.undefined;
        expect(body.createOn).not.to.be.undefined;
        expect(body.modifiedOn).not.to.be.undefined;
        fakeTeamId = body._id;
        done();
      });
    });

    it('should create a team with players', function(done){
      var team = {
        name: 'Team 1',
        players: players,
        city: {
          city: 'Thessaloniki',
          coords:[50.000,60.000]
        },
        level: 'Beginner'
      };

      requestOptions = {
        url: apiOptions.server + '/api/teams',
        method: 'POST',
        json: team,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.name).to.equal(team.name);
        expect(body.players).to.deep.equal(team.players);
        expect(body.city.city).to.equal(team.city.city);
        expect(body.city.coords).to.deep.equal(team.city.coords);
        expect(body.level).to.equal(team.level);
        expect(body._id).not.to.be.undefined;
        expect(body.createOn).not.to.be.undefined;
        expect(body.modifiedOn).not.to.be.undefined;
        done();
      });
    });

    it('should not create a team with player that does not exit', function(done){
      players.push(fakeTeamId);
      var team = {
        name: 'Team 1',
        players: players,
        city: {
          city: 'Thessaloniki',
          coords:[50.000,60.000]
        },
        level: 'Beginner'
      };

      requestOptions = {
        url: apiOptions.server + '/api/teams',
        method: 'POST',
        json: team,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
