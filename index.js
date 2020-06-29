//Required NPM Libraries 
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');

// app setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//Routes
app.get('/', ((req, res) => {
  //check to see if our users are logged in 
  res.render('index');
}))

//Initialize app on Port 
app.listen(process.env.PORT || 3000, (() => {
  console.log(`listening to the smooth, sweet sounds of port ${process.env.PORT} in the morning`)
}));