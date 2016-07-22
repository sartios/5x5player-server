var expect = require('chai').expect;
var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};

describe('Players API', function(){

  beforeEach(function(done){
    var requestOptions = {
      url: apiOptions.server + '/api/players',
      method: 'DELETE',
      json: {},
      qs: {}
    };

    request(requestOptions, function(err, response, body){
      expect(response.statusCode).to.equal(204);
      done();
    });

  });

  describe('GET /api/players', function(){
    var player;
    beforeEach(function(done){
      var availableDays = [];
      availableDays.push({day: 'Monday', time: '21:00'});
      player = {
        name: 'Player 1',
        position: 'Defense',
        number: 12,
        availableDays: availableDays
      };
      var requestOptions = {
        url: apiOptions.server + '/api/players',
        method: 'POST',
        json: player,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        player = body;
        done();
      });
    });

    it('should return all players', function(done){
      var requestOptions = {
        url: apiOptions.server + '/api/players',
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(1);
        expect(body[0].name).to.equal(player.name);
        expect(body[0].position).to.equal(player.position);
        expect(body[0].availableDays[0].day).to.equal(player.availableDays[0].day);
        expect(body[0].availableDays[0].time).to.equal(player.availableDays[0].time);
        expect(body[0].number).to.equal(player.number);
        expect(body[0].createOn).not.to.be.undefined;
        expect(body[0].modifiedOn).not.to.be.undefined;
        expect(body[0]._id).not.to.be.undefined;
        done();
      });
    });
  });

  describe('GET /api/players/:playerid', function(){
    var player;
    beforeEach(function(done){
      var availableDays = [];
      availableDays.push({day: 'Monday', time: '21:00'});
      player = {
        name: 'Player 1',
        position: 'Defense',
        number: 12,
        availableDays: availableDays
      };
      var requestOptions = {
        url: apiOptions.server + '/api/players',
        method: 'POST',
        json: player,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        player = body;
        done();
      });
    });

    it('should return the player', function(done){
      var requestOptions = {
        url: apiOptions.server + '/api/players/' + player._id,
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.name).to.equal(player.name);
        expect(body.position).to.equal(player.position);
        expect(body.availableDays[0].day).to.equal(player.availableDays[0].day);
        expect(body.availableDays[0].time).to.equal(player.availableDays[0].time);
        expect(body.number).to.equal(player.number);
        expect(body.createOn).not.to.be.undefined;
        expect(body.modifiedOn).not.to.be.undefined;
        expect(body._id).not.to.be.undefined;
        done();
      });
    });
  });

  describe('POST /api/fields', function(){
    it('should create a new player', function(done){
      var availableDays = [];
      availableDays.push({day: 'Monday', time: '21:00'});
      var player = {
        name: 'Player 1',
        position: 'Defense',
        number: 12,
        availableDays: availableDays
      };
      var requestOptions = {
        url: apiOptions.server + '/api/players',
        method: 'POST',
        json: player,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        player = body;
        expect(response.statusCode).to.equal(200);
        expect(body.name).to.equal(player.name);
        expect(body.position).to.equal(player.position);
        expect(body.availableDays[0].day).to.equal(player.availableDays[0].day);
        expect(body.availableDays[0].time).to.equal(player.availableDays[0].time);
        expect(body.number).to.equal(player.number);
        expect(body.createOn).not.to.be.undefined;
        expect(body.modifiedOn).not.to.be.undefined;
        expect(body._id).not.to.be.undefined;
        done();
      });
    });
  });

  describe('PUT /api/players/:playerid', function(){
    var player, availableDays;
    beforeEach(function(done){
      availableDays = [];
      availableDays.push({day: 'Monday', time: '21:00'});
      player = {
        name: 'Player 1',
        position: 'Defense',
        number: 12,
        availableDays: availableDays
      };
      var requestOptions = {
        url: apiOptions.server + '/api/players',
        method: 'POST',
        json: player,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        player = body;
        done();
      });
    });

    it('should update the player', function(done){
      var putdata = {
        name: 'Player 1 modified',
        position: 'Offense',
        number: 18,
      };
      var requestOptions = {
        url: apiOptions.server + '/api/players/' + player._id,
        method: 'PUT',
        json: putdata,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.name).to.equal(putdata.name);
        expect(body.position).to.equal(putdata.position);
        expect(body.number).to.equal(putdata.number);
        expect(body.modifiedOn).not.to.equal(player.modifiedOn);
        expect(body.createOn).to.equal(player.createOn);
        expect(body._id).to.equal(player._id);
        done();
      });
    });
  });

  describe('DELETE /api/players/:playerid', function(){
    var player, availableDays;
    beforeEach(function(done){
      availableDays = [];
      availableDays.push({day: 'Monday', time: '21:00'});
      player = {
        name: 'Player 1',
        position: 'Defense',
        number: 12,
        availableDays: availableDays
      };
      var requestOptions = {
        url: apiOptions.server + '/api/players',
        method: 'POST',
        json: player,
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        player = body;
        done();
      });
    });

    it('should delete player', function(done){
      var requestOptions = {
        url: apiOptions.server + '/api/players/' + player._id,
        method: 'DELETE',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(response.statusCode).to.equal(204);
      });
      requestOptions = {
        url: apiOptions.server + '/api/players/' + player._id,
        method: 'GET',
        json: {},
        qs: {}
      };
      request(requestOptions, function(err, response, body){
        expect(body.message).to.equal("playerid not found");
        done();
      });
    });
  });
});
