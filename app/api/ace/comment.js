function commentFactory() {
    function Comment(options) {
        this.defaults = {
            fct: 'savetask'
        };
    }

    Comment.prototype.add = function (message) {
    };

    return Comment;
}

// AMD boilerplate
(function (define) {
    define([], commentFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.ace = this.ace || { };
            this.ace.comment = factory();
        }
    }.bind(this)
));
