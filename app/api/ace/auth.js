function authFactory(extend) {
    function Auth(options) {
        this.defaults = {
            ace: null // Parent ace object.
        };
        this.options = extend(this.defaults, options);
    }

    Auth.prototype.logIn = function (username, password, callback) {
        var requestObject = {
            accountId: this.options.ace.options.accountId,
            username: username,
            password: password
        };
        this.options.ace.request('login', requestObject, function (err, data) {
            callback(err, data);
        });
    };

    return Auth;
}

// AMD boilerplate
(function (define) {
    define(['extend'], authFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.ace = this.ace || { };
            this.ace.auth = factory(jQuery.extend);
        }
    }.bind(this)
));
