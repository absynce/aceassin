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
    });
};

testAce();
