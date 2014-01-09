/* 
* 
*
* Access tickets from Assembla and sync to AceProject.
*/

var https = require('https');
var util  = require('util');
var options = {
    hostname: 'api.assembla.com',
    path: '/v1/spaces/[space]/tickets.json',
    headers: {
        'X-Api-Key': '[key]',
        'X-Api-Secret': '[secret]'
    }
};

https.get(options, function (res) {
    console.log('Status: ' + res.statusCode);
    
    var data = '';

    res.on('data', function (chunk) {
        console.log('Receiving data from Assembla: ' + chunk.length);
        data += chunk;
    });

    res.on('end', function () {
        console.log('Received tickets from Assembla: ' + util.inspect(data));
    });
}).on('error', function (e) {
    console.log('Error received while attempting to contact Assembla: ' + e.toString());
});