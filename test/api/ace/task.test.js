/* jshint expr: true */
/*
 * Test the Act.Task api.
 */
var Ace         = require('../../../app/api/ace/index');
var links       = require('../../../config/links');
var credentials = require('../../../config/authentication').ace; 
var ace     = new Ace(links[0].ace);

var testTask = module.exports = function testTask() {
    var should = require('should');

    describe('api/Ace.Task', function () {
        it('should instantiate a Task instance with an instance of project',
            function (done) {
                var project = ace.projects.add(new Ace.Project({ id: links[0].ace.projectId }));
                var task    = project.tasks.add(new Ace.Task({ id: 686851 }));

                task.should.have.property('project');
                task.project.should.equal(project);
                
                project.tasks.length.should.equal(1);
                project.tasks[0].should.equal(task);

                done();
            });
        
        
        describe('requires logIn', function () {
            var guid = null;

            before(function (done) {
                var auth    = new Ace.Auth();
                var links       = require('../../../config/links');
                var options = links[0].ace;
                
                console.log('beforeEach options', options);

                auth.logIn(options.accountId, 
                           credentials.username,
                           credentials.password,
                           options,
                           logInCallback);
                
                function logInCallback(error, logInResponse) {
                    if (error || logInResponse.status !== 'ok') {
                        return done(false);
                    }

                    guid = logInResponse.results[0].GUID;
                    done();
                }
            });

            
            it('should add a comment to a task', function (done) {
                var links   = require('../../../config/links');
                var options = links[0].ace;
                var task    = new Ace.Task({ id: 686851 });

                task.addComment(guid, 'Testing...1..2..3.', options, function (error, data) {
                    should.not.exist(error);
                    console.log(data);
                    data.status.should.equal('ok');
                    done();
                });
            });
        });
    });
};

testTask();
