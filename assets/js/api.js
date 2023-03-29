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
    PUT: function(req, URLpath, callback) {
        console.log("<PUT>");

        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const putData = JSON.parse(body);

            fs.writeFileSync(`.${URLpath.pathname}.json`, JSON.stringify(putData));
            let response = fs.readFileSync(`.${URLpath.pathname}.json`).toString();
            callback(response);
        });
    },    
    POST: function(req, res, callback) {
        console.log('<POST>');
        
        let body = '';
        req.on('data', (chunk) => {
            if (chunk) {
                console.log(chunk);
                console.log(chunk.toString());
                body += chunk.toString();
            }
        });
        req.on('end', () => {
            let response;
            try {
                const data = JSON.parse(body);

                    
                let newId = Math.floor(1000000 + Math.random() * 9000000);
                while (fs.existsSync(`./data/${newId}.json`)) {
                    newId = newId + 1;
                }

                fs.writeFileSync(`./data/${newId}.json`, JSON.stringify(data));

                response = fs.readFileSync(`./data/${newId}.json`).toString();
            } catch (error) {
                response = JSON.stringify({success: false, error: 'POST error'});
            }
            callback(response);
        });
    },
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


module.exports = {
    httpRequest: httpRequest
}
  