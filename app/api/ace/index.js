function aceFactory(auth, comment, extend, http, https, project, task, querystring) {
    function Ace(options) {
        this.defaults = {
            accountId: '',
            path: '/',
            ssl: false,
            hostname: 'api.aceproject.com'
        };
        this.options = extend(this.defaults, options);
        
        this.init();
    }

    // Add each api as separate module.
    Ace.auth    = auth;
    Ace.comment = comment;
    Ace.project = project;
    Ace.task    = task;

    Ace.prototype.init = function () {
        this.auth = new auth({ ace: this });
    };

    Ace.prototype.request = function (fct, requestObject, callback) {
        var agent   = http;
        var options = {
            hostname: this.url,
        };

        if (this.options.ssl) {
            agent = https;
        }
        
        // Join fct and path to options.
        requestObject.format = 'json'; // Set response format to JSON.
        var query = '?fct=' + fct + querystring.stringify(requestObject);
        options.path = path + query;

        agent.get(options, function (res) {
            callback(res);
        });
    };

    return Ace;
}

// AMD boilerplate
(function (define) {
    define(['./auth', './comment', 'extend', 'http', 'https', './project', './task', 'querystring'], aceFactory);
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
                               jQuery.extend,
                               http,
                               https,
                               this.ace.project,
                               this.ace.task);
        }
    }.bind(this)
));
