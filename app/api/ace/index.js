function aceFactory(auth,
                    comment,
                    extend,
                    http,
                    https,
                    JSONL,
                    project,
                    task,
                    querystring) {
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
            hostname: this.options.hostname,
        };

        if (this.options.ssl) {
            agent = https;
        }
        
        // Join fct and path to options.
        requestObject.format = 'json'; // Set response format to JSON.
        var query = '?fct=' + fct + '&' + querystring.stringify(requestObject);
        options.path = this.options.path + query;

        agent.get(options, function (res) {
            var data = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            }).on('end', function () {
                try {
                    var responseObject = JSONL.parse(data);
                    callback(null, responseObject);
                }
                catch (ex) {
                    callback(new Error('Could not parse JSON from data.', data));
                }
            });
        }).on('error', function (error) {
            callback(error);
        });
    };

    return Ace;
}

// AMD boilerplate
(function (define) {
    define(['./auth',
            './comment',
            'extend',
            'http',
            'https',
            'json-literal',
            './project',
            './task',
            'querystring'], aceFactory);
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
