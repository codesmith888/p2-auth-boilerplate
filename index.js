//Required NPM Libraries 
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');
//add passport, and custom middleware, sequelize sessions
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// app setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

// create new instance of class Sequelize Store
const sessionStore = new SequelizeStore({
  db: db.sequelize, 
  expiration: 1000 * 60 * 30
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false, 
  saveUninitialized: true
}))

sessionStore.sync();

//TODO: initialize and link flash message and passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;

  next();
})
//Routes
app.get('/', ((req, res) => {
  //check to see if our users are logged in 
  res.render('index');
}))

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
})

//include auth controller
app.use('/auth', require('./controllers/auth'))

//Initialize app on Port 
app.listen(process.env.PORT || 3000, (() => {
  console.log(`listening to the smooth, sweet sounds of port ${process.env.PORT} in the morning`)
}));