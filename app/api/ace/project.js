function projectFactory() {
    function Project(options) {
        this.defaults = {
            projectId: 0
        };
    }

    Project.prototype.add = function (message) {
    };

    return Project;
}

// AMD boilerplate
(function (define) {
    define([], projectFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.ace = this.ace || { };
            this.ace.project = factory();
        }
    }.bind(this)
));
