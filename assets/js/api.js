var fs=require('fs');

const httpRequest = {
    GET: function(URLpath, res) {
        if(fs.existsSync('.' + URLpath.pathname + '.json')){
            jsonFile = fs.readFileSync(`.${URLpath.pathname}.json`).toString()
            res.write(`
                <textarea rows="20" cols="60" style="width: 600px">${jsonFile}</textarea>
            `);
        }else{
            res.write(fs.readFileSync("view/header.html"));
        }
    },
    PUT: function(URLpath, reqBody, res) {
        // Parse the request body as JSON
        const jsonData = JSON.parse(reqBody);

        // Write the JSON data to a file
        fs.writeFileSync('.' + URLpath.pathname + '.json', JSON.stringify(jsonData));

        // Send a response to the client
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({success: true}));
        res.end();
    },
    POST: function(URLpath, reqBody, res) {
        // Parse the request body as JSON
        const jsonData = JSON.parse(reqBody);

        // Generate a new ID for the JSON data
        const newId = Math.floor(Math.random() * 1000000);

        // Add the ID to the JSON data
        jsonData.id = newId;

        // Write the JSON data to a file
        fs.writeFileSync('.' + URLpath.pathname + `/${newId}.json`, JSON.stringify(jsonData));

        // Send a response to the client
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({success: true, id: newId}));
        res.end();
    },
    DELETE: function(URLpath, res) {
        // Check if the JSON file exists
        if (fs.existsSync('.' + URLpath.pathname + '.json')) {
            // Delete the JSON file
            fs.unlinkSync('.' + URLpath.pathname + '.json');

            // Send a response to the client
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({success: true}));
            res.end();
        } else {
            // Send a response to the client
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({success: false, error: 'Resource not found'}));
            res.end();
        }
    }
}


module.exports = {
    httpRequest: httpRequest
}
  