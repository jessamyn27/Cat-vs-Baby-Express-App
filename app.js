const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');

const app           = express();
// const bodyParser     = require('body-parser');
const methodOverride = require('method-override');

const usersController   = require('./controllers/users');
// const authController   = require('./controllers/auth');
const indexController = require('./controllers/index');
// const photosController = require('./controllers/photos');
const homeController = require('./controllers/home');

// Set up middleware
app.use(methodOverride('_method'));
// app.use(bodyParser.urlencoded({extended: false}));

// set up controller routes
// app.use('/auth', authController);
app.use('/users', usersController);
app.use('/index', indexController);
// app.use('/photos', photosController);
app.use('/home', homeController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// require db
require('./db/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set Up our session
// app.use(session({
//   secret: 'this is a random secret string that you make up',
//   resave: false, // only save when the session object has been modified
//   saveUninitialized: false // useful for login sessions, we only want to to save when we modify
//   // session
// }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
