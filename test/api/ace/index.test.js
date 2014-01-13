/* jshint expr: true */
/*
 * Test the ace modules are defined here.
 */
var testAce = module.exports = function testAce() {
    var should = require('should');

    describe('api/ace', function () {
        it('should return a module with auth, comment, project, and task items',
            function (done) {
                var ace = require('../../../app/api/ace/index');

                should.exist(ace.auth);

                done();
            });
        
        it('should successfully log in with auth, returning a guid',
            function (done) {
                var Ace         = require('../../../app/api/ace/index');
                var links       = require('../../../config/links');
                var credentials = require('../../../config/authentication').ace; 
                
                var ace = new Ace(links[0].ace);
                ace.auth.logIn(credentials.username, credentials.password, function (err, guid) {
                    should.not.exist(err);
                    guid.should.be.a.String;
                });
            });
    });
};

testAce();
