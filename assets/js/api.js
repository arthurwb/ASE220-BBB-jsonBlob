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
            let response = ''
            if (fs.existsSync(`.${URLpath.pathname}.json`)) {
                fs.writeFileSync(`.${URLpath.pathname}.json`, JSON.stringify(putData));
                response = fs.readFileSync(`.${URLpath.pathname}.json`).toString();
            }
            else {
                response = JSON.stringify({success: false, error: 'Resource not found'});
            }
            callback(response);
        });
    },    
    POST: function(req, callback) {
        console.log('<POST>');
        let body = '';
        req.on('data', (chunk) => {
            if (chunk) {
                body += chunk.toString();
            }
        });
        req.on('end', () => {
            const data = JSON.parse(body);

            let newId = Math.floor(Math.random() * 1000000);

            fs.writeFileSync(`./data/${newId}.json`, JSON.stringify(data));

            let response = fs.readFileSync(`./data/${newId}.json`).toString();
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
  