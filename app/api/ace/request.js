function requestFactory(extend,
                        http,
                        https,
                        JSONL,
                        querystring) {
    var request = function request(fct, object, options, callback) {
        this.defaults = { 
            ssl : false
        };
        this.options  = extend(this.defaults, options);
        var agent     = http;   // Request handler
        
        if (!object.format) {
            object.format = 'json'; // Set response format to JSON.
        }

        if (this.options.ssl) {
            agent = https;
        }
        
        // Join fct and path to options.
        var query = '?fct=' + fct + '&' + querystring.stringify(object);
        this.options.path = this.options.path + query;

        console.log('request options', this.options);
        agent.get(this.options, function (res) {
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
        }).on('error', callback);
    };

    return request;
}
// AMD boilerplate
(function (define) {
    define(['extend',
            'http',
            'https',
            'json-literal',
            'querystring'], requestFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.Ace         = this.Ace || { };
            this.Ace.Request = factory(jQuery.extend,
                                       http,
                                       https,
                                       JSONL,
                                       querystring);
                               
        }
    }.bind(this)
));
