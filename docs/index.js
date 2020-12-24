var express = require('express');
var cookieParser = require('cookie-parser')
var morgan = require('morgan')

var app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use("/mongo", require("./route/mongo"));
app.set('port', 3333);

const http = require('http');
var server = http.createServer(app);
server.listen(3333);
server.on('error', (error) => {
    console.log(console.log("error"));
    process.exit(1);
})
server.on('listening', () => {
    console.log("Listening on 3333.")
});
