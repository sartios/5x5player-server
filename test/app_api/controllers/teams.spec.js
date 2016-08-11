var expect = require('chai').expect;
var request = require('request');
var ObjectId = require('mongodb').ObjectId;

var apiOptions = {
    server: 'http://localhost:3000'
};

describe('Teams API', function() {

    beforeEach(function(done){
        var requestOptions = {
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

    beforeEach(function(done) {
        var requestOptions = {
            url: apiOptions.server + '/api/teams',
            method: 'DELETE',
            json: {},
            qs: {},
            headers:{
                authorization: 'Bearer ' + apiOptions.token
            }
        };
        request(requestOptions, function(err, response, body) {
            expect(response.statusCode).to.equal(204);
            done();
        });
    });

    describe('POST /api/teams', function() {
        var players = [],
            requestOptions, fakeTeamId;
        beforeEach(function(done) {
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
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                players.push(body._id);
            });
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                players.push(body._id);
                done();
            });
        });
        it('should create a team without players', function(done) {
            var team = {
                name: 'Team 1',
                players: [],
                city: {
                    city: 'Thessaloniki',
                    coords: [50.000, 60.000]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
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

        it('should create a team with players', function(done) {
            var team = {
                name: 'Team 1',
                players: players,
                city: {
                    city: 'Thessaloniki',
                    coords: [50.000, 60.000]
                },
                level: 'Beginner'
            };

            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
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

        it('should not create a team with player that does not exit', function(done) {
            players.push(fakeTeamId);
            var team = {
                name: 'Team 1',
                players: players,
                city: {
                    city: 'Thessaloniki',
                    coords: [50.000, 60.000]
                },
                level: 'Beginner'
            };

            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('should return 404 on not acceptable level', function(done){
            var team = {
                name: 'Team 1',
                players: players,
                city: {
                    city: 'Thessaloniki',
                    coords: [50.000, 60.000]
                },
                level: 'not-acceptable'
            };

            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('GET /teams', function() {
        var team, requestOptions;
        it('should return an empty array if no teams exist', function(done) {
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'GET',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(body).to.deep.equal([]);
                done();
            });
        });

        it('should return all the teams', function(done) {
            team = {
                name: 'Team name',
                players: [],
                city: {
                    city: 'Team city',
                    coords: [1, 2]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };

            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
            });
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
            });

            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'GET',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };

            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.length).to.equal(2);
                done();
            });
        });
    });

    describe('GET /teams/:teamid', function() {
        var team, requestOptions, teamId;
        beforeEach(function(done) {
            team = {
                name: 'Team name',
                players: [],
                city: {
                    city: 'Team city',
                    coords: [1, 2]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                team._id = body._id;
                team.createOn = body.createOn;
                team.modifiedOn = body.modifiedOn;
                done();
            });
        });

        it('should return the team specified by id', function(done) {
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id,
                method: 'GET',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };

            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.name).to.equal(team.name);
                expect(body.players).to.deep.equal(team.players);
                expect(body.city.city).to.equal(team.city.city);
                expect(body.city.coords).to.deep.equal(team.city.coords);
                expect(body.level).to.equal(team.level);
                expect(body._id).to.equal(team._id);
                expect(body.createOn).to.equal(team.createOn);
                expect(body.modifiedOn).to.equal(team.modifiedOn);
                done();
            });
        });

        it('should return 404 if the team id does not exist', function(done) {
            requestOptions = {
                url: apiOptions.server + '/api/teams/team-id-does-not-exist',
                method: 'GET',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('PUT /teams/:teamid', function() {
        var team, requestOptions;
        beforeEach(function(done) {
            team = {
                name: 'Team name',
                players: [],
                city: {
                    city: 'Team city',
                    coords: [1, 2]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                team._id = body._id;
                done();
            });
        });

        it('should update the team', function(done) {
            team.city = {
                city: 'Team city sample',
                coords: [4, 10]
            };
            team.level = 'Advanced';
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id,
                method: 'PUT',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(team.city.city).to.equal(body.city.city);
                expect(team.city.coords).to.deep.equal(body.city.coords);
                expect(team.level).to.equal(body.level);
                expect(team.modifiedOn).not.to.equal(body.modifiedOn);
                done();
            });
        });

        it('should return 404 if teamid does not exist', function(done) {
            requestOptions = {
                url: apiOptions.server + '/api/teams/',
                method: 'PUT',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('should return 404 if level is wrong', function(done) {
            team.level = 'I dont know';
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id,
                method: 'PUT',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('PUT /teams/:teamid/add-player', function() {
        var team, requestOptions, player;
        beforeEach(function(done) {
            team = {
                name: 'Team name',
                players: [],
                city: {
                    city: 'Team city',
                    coords: [1, 2]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                team._id = body._id;
            });

            player = {
                name: 'Player 1',
                position: 'Defense',
                number: 12
            };
            requestOptions = {
                url: apiOptions.server + '/api/players',
                method: 'POST',
                json: player,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                player._id = body._id;
                done();
            });
        });

        it('should add player to team', function(done) {
            var options = {
                playerid: player._id
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id + '/add-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.players[0]).to.equal(player._id);
                done();
            });
        });

        it('should not add a player that does not exist', function(done) {
            var options = {
                playerid: new ObjectId()
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id + '/add-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                expect(body.players.length).to.equal(0);
                done();
            });
        });

        beforeEach(function(done) {
            var options = {
                playerid: player._id
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id + '/add-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('should not add duplicate player', function(done) {
            var options = {
                playerid: player._id
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id + '/add-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.players.length).to.equal(1);
                done();
            });
        });
    });

    describe('PUT /teams/:teamid/remove-player', function() {
        var player, team, requestOptions;

        beforeEach(function(done) {
            player = {
                name: 'Player 1',
                position: 'Defense',
                number: 12
            };
            requestOptions = {
                url: apiOptions.server + '/api/players',
                method: 'POST',
                json: player,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                player._id = body._id;
                done();
            });
        });

        beforeEach(function(done) {
            team = {
                name: 'Team name',
                players: [player._id],
                city: {
                    city: 'Team city',
                    coords: [1, 2]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                team._id = body._id;
                done();
            });
        });

        it('should remove player from team', function(done) {
            var options = {
                playerid: player._id
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id + '/remove-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.players.length).to.equal(0);
                done();
            });
        });

        it('should remove nothing if player is not associated with team', function(done) {
            var options = {
                playerid: new ObjectId()
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id + '/remove-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.players.length).to.equal(1);
                done();
            });
        });

        it('should return 404 when team id does not exist', function(done) {
            var options = {
                playerid: new ObjectId()
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + '' + '/remove-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('should return 404 when team does not exist', function(done) {
            var options = {
                playerid: new ObjectId()
            };

            requestOptions = {
                url: apiOptions.server + '/api/teams/' + options.playerid + '/remove-player',
                method: 'PUT',
                json: options,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('DELETE /teams', function() {
        var countBefore, requestOptions, team;

        beforeEach(function(done) {
            team = {
                name: 'Team name',
                players: [],
                city: {
                    city: 'Team city',
                    coords: [1, 2]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        beforeEach(function(done) {
            requestOptions = {
                url: apiOptions.server + "/api/teams",
                method: 'GET',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                countBefore = body.length;
                done();
            });
        });

        it('should delete all teams', function(done) {
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'DELETE',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(204);
            });

            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'GET',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.length).to.equal(0);
                expect(countBefore).not.to.equal(body.length);
                done();
            });
        });
    });




    describe('DELETE /teams/:teamid', function() {
        var requestOptions, team;

        beforeEach(function(done) {
            team = {
                name: 'Team name',
                players: [],
                city: {
                    city: 'Team city',
                    coords: [1, 2]
                },
                level: 'Beginner'
            };
            requestOptions = {
                url: apiOptions.server + '/api/teams',
                method: 'POST',
                json: team,
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(200);
                team._id = body._id;
                done();
            });
        });

        it('should delete team by id', function(done) {
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id,
                method: 'DELETE',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(204);
            });

            requestOptions = {
                url: apiOptions.server + '/api/teams/' + team._id,
                method: 'GET',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('should return 404 when team does not exist', function(done) {
            var teamId = new ObjectId();
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + teamId,
                method: 'DELETE',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('should return 404 when teamid does not exist', function(done) {
            var teamId = '';
            requestOptions = {
                url: apiOptions.server + '/api/teams/' + teamId,
                method: 'DELETE',
                json: {},
                qs: {},
                headers:{
                    authorization: 'Bearer ' + apiOptions.token
                }
            };
            request(requestOptions, function(err, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

});
