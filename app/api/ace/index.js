function aceFactory(auth,
                    comment,
                    extend,
                    project,
                    task) {
    function Ace(options) {
        this.defaults = {
            accountId : '',
            loggedIn  : false,
            path      : '/',
            ssl       : false,
            hostname  : 'api.aceproject.com'
        };
        this.options = extend(this.defaults, options);
        
        this.init();
    }

    // Add each api as separate module.
    Ace.Auth    = auth;
    Ace.Comment = comment;
    Ace.Project = project;
    Ace.Task    = task;

    // to add related ace instance.
    Ace.prototype.projects = [];
    Ace.prototype.projects.add = function (project) {
        project.ace = this.ace;
        this.push(project);
        return project;
    };

    Ace.prototype.init = function () {
        this.auth         = new auth({ ace: this });
        this.projects.ace = this;
    };

    return Ace;
}

// AMD boilerplate
(function (define) {
    define(['./auth',
            './comment',
            'extend',
            './project',
            './task'], aceFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.Ace = factory(this.Ace.Auth,
                               this.Ace.Comment,
                               jQuery.extend,
                               this.Ace.Project,
                               this.Ace.Task);
        }
    }.bind(this)
));
