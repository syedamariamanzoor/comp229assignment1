// Istalled third party packages
//Syeda Maria Manzoor, 301184173, 03-Oct-2021>

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = require('passport-local').Strategy;
let flash = require('connect-flash');




// database connection
let mongoose = require('mongoose');
let DB = require('./db');

mongoose.connect(DB.RemoteURI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error..'));

mongoDB.once('open', () =>{
console.log('Connected to mongo db...');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let businessContactRouter = require('../routes/business_contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//config file


// passport user config


// create user
let userModel = require('../models/user');
let User = userModel.User;

// create a auth strategy
passport.use(User.createStrategy());


//serialize / deserialize user obj
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/businesscontact', businessContactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
