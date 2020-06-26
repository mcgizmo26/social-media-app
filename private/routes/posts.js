const routes = require('express').Router();
const fs = require('fs');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.get('/home', (req, res) => {
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
});

routes.post('/createPost', (req, res) => {
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
            res.end();
        }
    });
});

module.exports = routes;