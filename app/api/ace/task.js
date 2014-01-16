function taskFactory(extend, request) {
    function Task(options) {
        this.defaults = {
            id: null
        };
        this.options  = extend(this.defaults, options);
    }

    Task.prototype.addComment = function (guid, comment, options, callback) {
        var requestObject = {
            addComments : comment,
            guid        : guid,
            taskId      : this.options.id
        };
        request('savetask', requestObject, options, addCommentCallback);

        function addCommentCallback(err, addCommentResponse) {
            callback(err, addCommentResponse);
        }
    };

    return Task;
}

// AMD boilerplate
(function (define) {
    define(['extend', './request'], taskFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.Ace      = this.Ace || { };
            this.Ace.Task = factory(jQuery.extend,
                                    this.Ace.Request);
        }
    }.bind(this)
));
