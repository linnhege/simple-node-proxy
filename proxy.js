var http = require('http');

http.createServer(onRequest).listen(3000);

function onRequest(client_req, client_res) {
    console.log('serve: ' + client_req.url);

    var options = {
        hostname: 'spp.dev',
        port: 80,
        path: client_req.url+'/?XDEBUG_SESSION_START=PHPSTORM',
        method: 'GET'
    };

    var proxy = http.request(options, function (res) {
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}
