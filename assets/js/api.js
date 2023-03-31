// Import the file system module
var fs=require('fs');

// Below creates an object containing HTTP request methods
const httpRequest = {
    // HTTP GET request method
    GET: function(URLpath) {
        console.log("<GET>");
        // Check if the requested JSON file exists
        if (fs.existsSync('.' + URLpath.pathname + '.json')) {
            // Read and return the content of the JSON file
            jsonFile = fs.readFileSync(`.${URLpath.pathname}.json`).toString();
            return jsonFile;
        } else {
            // If the requested JSON file doesn't exist, send a response to the client indicating the resource was not found
            return JSON.stringify({success: false, error: 'Resource not found'});
        }
    },
    
    // HTTP PUT request method
    PUT: function(req, URLpath, callback) {
        console.log("<PUT>");
        // Read the request body
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        // Once the request body is fully read, parse the data and write it to a file
        req.on('end', () => {
            let response;
            try {
                const putData = JSON.parse(body);
                // Check if the requested JSON file exists
                if (fs.existsSync(`.${URLpath.pathname}.json`)) {
                    // Write the parsed JSON data to the requested file and return its content
                    fs.writeFileSync(`.${URLpath.pathname}.json`, JSON.stringify(putData));
                    response = fs.readFileSync(`.${URLpath.pathname}.json`).toString();
                }
                else {
                    // If the requested JSON file doesn't exist, send a response to the client indicating the resource was not found
                    response = JSON.stringify({success: false, error: 'Resource not found'});
                }
            } catch (error) {
                // If there is an error parsing the data, send a response to the client indicating there was a PUT error
                response = JSON.stringify({success: false, error: 'PUT error'});
            }
            // Call the provided callback function and pass the response as an argument
            callback(response);
        });
    },
    
    // HTTP POST request method
    POST: function(req, callback) {
        console.log('<POST>');
        let body = '';
        // Read the request body
        req.on('data', (chunk) => {
            if (chunk) {
                console.log(chunk);
                console.log(chunk.toString());
                body += chunk.toString();
            }
        });
        // Once the request body is fully read, parse the data and write it to a new file with a random name
        req.on('end', () => {
            let response;
            try {
                const data = JSON.parse(body);
                // Generate a new file name with a random ID    
                let newId = Math.floor(1000000 + Math.random() * 9000000);
                while (fs.existsSync(`./data/${newId}.json`)) {
                    newId = newId + 1;
                }
                // Write the parsed JSON data to the new file and return its content
                fs.writeFileSync(`./data/${newId}.json`, JSON.stringify(data));
                response = fs.readFileSync(`./data/${newId}.json`).toString();
            } catch (error) {
                // If there is an error parsing the data, send a response to the client indicating there was a POST error
                response = JSON.stringify({success: false, error: 'POST error'});
            }
            // Call the provided callback function and pass the response as an argument
            callback(response);
        });
    },
    // HTTP DELETE request method
    DELETE: function(URLpath, res) {
        console.log("<DELETE>");
        // Check if the JSON file exists
        if (fs.existsSync('.' + URLpath.pathname + '.json')) {
            // Delete the JSON file
            fs.unlinkSync('.' + URLpath.pathname + '.json');
            // Send a response to the client
            return JSON.stringify({success: true, message: `${URLpath.pathname} has been deleted`});
        } else {
            // Send a response to the client
            return JSON.stringify({success: false, error: 'Resource not found'});
        }
    }
}

// Below makes the httpRequest object available for other modules to use when importing.
module.exports = {
    httpRequest: httpRequest
}
  
