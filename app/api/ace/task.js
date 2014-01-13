function taskFactory() {
    function Task(options) {
        this.defaults = {
        };
    }

    Task.prototype.add = function (message) {
    };

    return Task;
}

// AMD boilerplate
(function (define) {
    define([], taskFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.ace      = this.ace || { };
            this.ace.task = factory();
        }
    }.bind(this)
));
