
var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
var morgan = require("morgan");

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//DB Connection
var dbConfig = require('./config/db.js');
mongoose.connect(dbConfig.url, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + dbConfig.url);
        console.log(err);
    }
    else {
        console.log('Connection successful to: ' + dbConfig.url);
    }
});



// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

//Routes
var appRoutes = require('./routes/lists');
app.use('/api', appRoutes);

//Start the server
var port = process.env.PORT || 4000;
app.listen(port);
