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
            this.Ace = factory(this.Ace.Auth,
                               this.Ace.Comment,
                               jQuery.extend,
                               http,
                               https,
                               this.Ace.Project,
                               this.Ace.Task);
        }
    }.bind(this)
));
