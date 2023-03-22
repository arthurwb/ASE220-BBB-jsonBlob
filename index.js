var http = require('http');
var fs=require('fs');
const url=require('url');

const httpRequest = {
    GET: function(URLpath, res) {
        if(fs.existsSync('.' + URLpath.pathname + '.json')){
            jsonFile = fs.readFileSync(`.${URLpath.pathname}.json`).toString()
            res.write(`
                <textarea rows = "20" cols = "60" style='width: 600px'>${jsonFile}</textarea>
            `);
            console.log('xxxxx');
        }else{
            res.write("test");
        }
    },
    PUT: function() {

    },
    POST: function() {

    },
    DELETE: function() {

    }
}

//create a server object:
http.createServer(function (req, res) {
    let url_components=url.parse(req.url,true);

    res.writeHead(200, {'Content-Type': 'text/html'});

    let header = fs.readFileSync("view/header.html");
    let footer = fs.readFileSync("view/footer.html");

    res.write(header);
    
    httpRequest.GET(url_components, res);

    res.write(footer);

    res.end();
}).listen(8080); //the server object listens on port 8080