function authFactory(extend) {
    function Auth(options) {
        this.defaults = {
            ace: null // Parent ace object.
        };
    }

    Auth.prototype.logIn = function (username, password, callback) {
        console.log('Calling Auth.prototype.logIn with ', arguments);
        
        var requestObject = {
            accountId: this.ace.accountId,
            username: username,
            password: password
        };
        this.ace.request('login', // TODO: Finish this request.

        callback(new Error('Not implemented'));
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
