var http = require('http');
var fs=require('fs');
const url=require('url');

//create a server object:
http.createServer(function (req, res) {
    let url_components=url.parse(req.url,true);

    res.writeHead(200, {'Content-Type': 'text/html'});

    if(fs.existsSync('.' + url_components.pathname + '.json')){
        jsonFile = fs.readFileSync(`.${url_components.pathname}.json`).toString()
		res.write(`
            <input type="textarea" rows = "5" cols = "60" value='${jsonFile}' style='width: 600px'>
        `);
		console.log('xxxxx');
	}else{
		res.write("test");
	}

    res.end();
}).listen(8080); //the server object listens on port 8080