function authFactory(extend, request) {
    function Auth(options) {
        this.defaults = {
            // TODO: Convert guid and loggedIn to a session variable.
            guid     : null,
            loggedIn : false
        };
        this.options = extend(this.defaults, options);
    }

    Auth.prototype.logIn = function (accountId, username, password, requestOptions, callback) {
        var requestObject = {
            accountId : accountId,
            username  : username,
            password  : password
        };
        request('login', requestObject, requestOptions, function (err, logInResponse) {
            if (!err && logInResponse.status === 'ok') {
                this.options.loggedIn = true;
                this.options.guid     = logInResponse.GUID;
            }

            callback(err, logInResponse);
        }.bind(this));
    };

    return Auth;
}

// AMD boilerplate
(function (define) {
    define(['extend', './request'], authFactory);
}(
    typeof define == 'function' && define.amd ? define 
    : function (ids, factory) {
        if (typeof exports === 'object') {   
            var deps = ids.map(function (id) { return require(id); });
            module.exports = factory.apply(null, deps);
        }
        else {
            this.Ace      = this.Ace || { };
            this.Ace.Auth = factory(jQuery.extend,
                                    this.Ace.Request);
        }
    }.bind(this)
));
