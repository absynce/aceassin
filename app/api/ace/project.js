function projectFactory(extend) {
    function Project(options) {
        this.defaults = {
            id: 0
        };
        this.options = extend(this.defaults, options);
        
        this.init();
    }
    
    Project.prototype.tasks = [];
    Project.prototype.tasks.add = function (task) {
        task.project = this.project;
        this.push(task);
        return task;
    };

    Project.prototype.add = function (message) {
    };
    
    Project.prototype.init = function () {
        this.tasks.project = this;
    };

    return Project;
}

// AMD boilerplate
(function (define) {
    define(['extend'], projectFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.ace = this.ace || { };
            this.ace.project = factory(jQuery.extend);
        }
    }.bind(this)
));
