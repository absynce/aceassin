 /* jshint expr: true */
/*
 * Test the auth module.
 */
var testAuth = module.exports = function testAuth() {
    var should = require('should');

    describe('api/Ace.Auth', function () {
        it('should successfully log in with auth, returning a guid',
            function (done) {
                var Ace         = require('../../../app/api/ace/index');
                var links       = require('../../../config/links');
                var credentials = require('../../../config/authentication').ace; 
                
                // Options includes both accountId and request options for logIn request.
                var options = links[0].ace;
                var auth    = new Ace.Auth();

                auth.logIn(options.accountId,
                           credentials.username,
                           credentials.password,
                           options,
                           logInCallback);

                function logInCallback(err, data) {
                    should.not.exist(err);
                    data.status.should.equal('ok');
                    data.results[0].GUID.should.be.a.String;
                    done();
                }
            });
    });
};

testAuth();
