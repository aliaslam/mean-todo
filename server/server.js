//Setup

var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

var time = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//DB Connection
var dbName = "todo";
mongoose.connect('mongodb://localhost/' + dbName);

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

//Routes
var app_routes = require('./routes/lists');
app.use('/api', app_routes);

//Start the server
var port = process.env.PORT || 4000;
app.listen(port);
