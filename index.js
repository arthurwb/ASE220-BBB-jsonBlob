var http = require('http');
var fs=require('fs');
const url=require('url');
var api = require('./assets/js/api.js');

//create a server object:
http.createServer(function (req, res) {
    if (req.url === '../public/stylesheets/styles.css') {
        res.sendFile("public/stylesheets/styles.css");
    }

    let url_components=url.parse(req.url,true);

    res.writeHead(200, {'Content-Type': 'text/html'});

    let header = fs.readFileSync("view/header.html", 'utf8');
    let footer = fs.readFileSync("view/footer.html", 'utf8');

    res.write(header);

    api.httpRequest.GET(url_components, res);

    res.write(footer);

    res.end();
}).listen(8080); //the server object listens on port 8080