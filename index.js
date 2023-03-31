// Require necessary modules
var http = require('http');
var fs=require('fs');
const url=require('url');

// Import api from a local file
var api = require('./assets/js/api.js');

//create a server object:
http.createServer(function (req, res) {

    // Parse the URL of the incoming request
    let url_components=url.parse(req.url, true);

    switch (req.method) {
        case "GET":
            // Call the GET function from the api module and send back the response to the client when done
            let getResponse = api.httpRequest.GET(url_components);
            // Below formats/sends the reponse based on the api reponse
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(getResponse, 'utf8');
            res.end();
            break;
        case "PUT":
            // Call the PUT function from the api module and send back the response to the client
            api.httpRequest.PUT(req, url_components, (putResponse) => {
                // Below formats/sends the reponse based on the api reponse
                res.writeHead(200,{'Content-Type':'application/json'});
                res.write(putResponse, 'utf8');
                res.end();
            });
            break;            
        case "POST":
            // Call the POST function from the api module and send back the response to the client
            api.httpRequest.POST(req, (postResponse) => {
                // Below formats/sends the reponse based on the api reponse
                res.writeHead(200,{'Content-Type':'application/json'});
                res.write(postResponse, 'utf8');
                res.end();
            });
            break;
        case "DELETE":
            // Call the DELETE function from the api module and send back the response to the client
            let deleteResponse = api.httpRequest.DELETE(url_components);
            // Below formats/sends the reponse based on the api reponse
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(deleteResponse, 'utf8');
            res.end();
            break;
    }
}).listen(8080); //the server object listens on port 8080
