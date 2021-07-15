const app = require('./app');
const https = require('https')
const fs = require('fs')

const SSL_KEY = fs.readFileSync('./certificates/key.pem')
const SSL_CERT = fs.readFileSync('./certificates/cert.pem')

const credentials = {key: SSL_KEY, cert: SSL_CERT};

const server = https.createServer(credentials,app)

server.listen(process.env.PORT,()=>{
    console.log('app listening on port', process.env.PORT);
});