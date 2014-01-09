#!/usr/bin/env node

/* 
* aceassin
* Accept requests from Assembla to be synced to Ace.
*
*/
var fs = require('fs');

var app = module.exports = function getServerInstance(params) {
    params = params || {};
    // specify current dir as default root of server
    params.root = params.root || __dirname;

    if (params.key && params.cert) {
        params.key  = fs.readFileSync(key);
        params.cert = fs.readFileSync(cert);
    }

    return require('compound').createServer(params);
};

if (!module.parent) {
    var port = process.env.PORT || 3000;
    var host = process.env.HOST || '0.0.0.0';
    var key  = process.env.SSLKEY || null;
    var cert = process.env.SSLCERT || null;

    var server = app({ key: key, cert: cert });
    server.listen(port, host, function () {
        console.log(
            'Compound server listening on %s:%d within %s environment',
            host, port, server.set('env')
        );
    });
} 
