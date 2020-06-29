const express = require('express');
const router = express.Router();
const db = require('../models');
//import db 
//import middleware 

//register get route
router.get('./register', function(req, res) {
  res.render('auth/register')
})
//register post route
router.post('/register', function(req, res) {
  db.user.findorCreate({
    where: {
      email: req.body.email
    }, defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(function([user, created]) {
    //if user was created
    if (created) {
       //authenticate user and start authorization process
      console.log('User created 🎉');
      res.redirect('/');
    }else {
      console.log('User email already exists❌')
      req.flash('error', 'Error: email already exists for user. Please try again.');
      res.redirect('auth/register');
    }
  }).catch(function(error) {
    console.log(`Error found. \nMessage: ${error.message}. \nPlease review = ${error}`)
    req.flash('error', err.message);
    res.redirect('/auth/register');
  })
})
//login get route
router.get('./login', function(req, res) {
  res.render('auth/login');
})
//login post route

//export router
module.exports = router;