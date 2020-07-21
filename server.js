const http = require('http');
const app = require('./app');
const port = 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Server is running on port 3000 in localhost")
});