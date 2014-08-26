
var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var morgan = require("morgan");
var app = express();


// require('./config/passport')(passport); // pass passport for configuration

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  This would query a database;
passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        user.comparePassword(password, function(err, isMatch) {
            if (err) return done(err);
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }
        });
    });
}));

app.use(passport.initialize());
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
