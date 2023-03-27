var fs=require('fs');

const httpRequest = {
    GET: function(URLpath) {
        console.log("<GET>");
        if (fs.existsSync('.' + URLpath.pathname + '.json')) {
            jsonFile = fs.readFileSync(`.${URLpath.pathname}.json`).toString();
            return jsonFile;
        } else {
            // Send a response to the client
            return JSON.stringify({success: false, error: 'Resource not found'});
        }
    },
    PUT: function(URLpath, reqBody, res) {
        console.log("<PUT>");
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
        console.log("<POST>");
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
        console.log("<DELETE>");
        // Check if the JSON file exists
        if (fs.existsSync('.' + URLpath.pathname + '.json')) {
            // Delete the JSON file
            fs.unlinkSync('.' + URLpath.pathname + '.json');

            // Send a response to the client
            return JSON.stringify({success: true});
        } else {
            // Send a response to the client
            return JSON.stringify({success: false, error: 'Resource not found'});
        }
    }
}


module.exports = {
    httpRequest: httpRequest
}
  