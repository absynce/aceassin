/* jshint expr: true */
/*
 * Test the project api.
 */
var testProject = module.exports = function testProject() {
    var should = require('should');

    describe('api/Ace.Project', function () {
        it('should instantiate a Project instance with an instance of ace',
            function (done) {
                var Ace     = require('../../../app/api/ace/index');
                var links   = require('../../../config/links');
                var ace     = new Ace(links[0].ace);
                var project = ace.projects.add(new Ace.Project({ id: links[0].ace.projectId }));
                
                project.should.have.property('ace');
                project.ace.should.equal(ace);
                done();
            });
    });
};

testProject();
