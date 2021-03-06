var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');


var index = require('./routes/index');
var users = require('./routes/users');
var data = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret: '1010101010101010101010101010'
}));
app.use(flash());
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var url = 'mongodb://localhost:27017/wiki';
var db = mongoose.connect(url);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connection.on('error', function (err) {
    console.log('Mongodb connection error')
});
mongoose.connection.once('open', function () {
    console.log('Successful DB Connection Via Mongoose')


    app.use('/', index);
    app.use('/users', users);
    app.use('/data', data);
//app.use('/data', data);
// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
});//end mongoose callback


module.exports = app;
