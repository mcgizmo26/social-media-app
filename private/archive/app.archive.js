const config = require('./config');
const fs = require('fs');


const http = require('http');

// Server
const server = http.createServer((req, res) => {
    console.log(req.url);
    switch (req.url) {
        case '/api/home':
            try {
                if (!fs.existsSync('./MockData/comment.json')) {

                    fs.writeFileSync('./MockData/comment.json', "[]");
                    const filePath = './MockData/comment.json';

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    fs.createReadStream(filePath).pipe(res);
                } else {
                    const filePath = './MockData/comment.json';

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    fs.createReadStream(filePath).pipe(res);
                }
            } catch (err) {

            }
            break;
        case '/api/createPost':
            let reqBody = [];

            req.on('data', chunk => {
                reqBody.push(chunk);
            }).on('end', () => {
                reqBody = JSON.parse(Buffer.concat(reqBody).toString('utf8'));

                try {
                    const fileToConvert = fs.readFileSync('./MockData/comment.json', 'utf8');
                    let parsedData = JSON.parse(fileToConvert);
                    parsedData.push(reqBody);
                    fs.writeFileSync('./MockData/comment.json', JSON.stringify(parsedData));
                    res.end();
                } catch(err) {
                    console.log(err);
                    res.end();
                }
            });

            break;
        case '/api/settings':
            res.write(`I'm ready at this ${req.url}`);
            res.end();
            break;

        default:
            break;
    }
});



server.listen(config.port, config.hostname, () => {
    console.log(`We're on port: ${config.port}`);
    console.log(`hostname: ${config.hostname}`);
});