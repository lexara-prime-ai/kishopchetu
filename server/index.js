const log = console.log;
const http = require('http');

const SERVER = http.createServer((req, res) => {
    log(req.url, ' ', req.method);

    if (req.url === '/') {
        fetch()
    }


}).listen(5500, 'App is running at : http://localhost:5500');