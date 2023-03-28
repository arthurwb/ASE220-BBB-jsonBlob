var http = require('http');
var fs=require('fs');
const url=require('url');
var api = require('./assets/js/api.js');

//create a server object:
http.createServer(function (req, res) {

    let url_components=url.parse(req.url,true);

    switch (req.method) {
        case "GET":
            let getResponse = api.httpRequest.GET(url_components);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(getResponse, 'utf8');
            break;
        case "PUT":
            api.httpRequest.PUT();
            break;
        case "POST":
            api.httpRequest.POST();
            break;
        case "DELETE":
            let deleteResponse = api.httpRequest.DELETE(url_components);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(deleteResponse, 'utf8');
            break;
    }

    res.end();
}).listen(8080); //the server object listens on port 8080