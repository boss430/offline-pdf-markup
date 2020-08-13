var express = require('express');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')

var app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use("/mongo", require("./mongo"));
app.set('port', 3333);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/dev", { useNewUrlParser: true, useUnifiedTopology: true, }).then(
    () => {
        console.log("[success] connected to the database ");
    },
    error => {
        console.log("[failed] " + error);
        process.exit();
    }
).catch((err) => {
    console.log(err)
    process.exit()
}
);

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
