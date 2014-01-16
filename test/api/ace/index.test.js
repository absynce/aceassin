/* jshint expr: true */
/*
 * Test the ace modules are defined here.
 */
var testAce = module.exports = function testAce() {
    var should = require('should');

    describe('api/ace', function () {
        it('should return a module with auth, comment, project, and task items',
            function (done) {
                var Ace = require('../../../app/api/ace/index');

                should.exist(Ace.Auth);
                should.exist(Ace.Project);

                done();
            });
    });
};

testAce();
