function aceFactory(auth, comment, project, task) {
    function Ace(options) {
    }

    Ace.auth    = auth;
    Ace.comment = comment;
    Ace.project = project;
    Ace.task    = task;

    return Ace;
}

// AMD boilerplate
(function (define) {
    define(['./auth', './comment', './project', './task'], aceFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.ace = factory(this.ace.auth,
                               this.ace.comment,
                               this.ace.project,
                               this.ace.task);
        }
    }.bind(this)
));
