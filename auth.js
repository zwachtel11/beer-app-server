'use strict'

const passport = require('passport')
const User = require('./connectors').User
let LocalStrategy = require('passport-local').Strategy
const config = require('./config')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = module.exports = express.Router()

const dummy = new User ()

const createToken = (user) => {
  return jwt.sign(user, config.secret, { expiresIn: 60*60*5})
}

//sign up a new user, still figuring out what do to this in sitch !
app.post('/users', (req, res) => {

  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password")
  }

  if (User.findUser(req.body.username)) {
    return res.status(400).send("A user with that username already exists")
  }

  const user = User.addUser(req.body.username, req.body.password)

  res.status(201).send({
    id_token: createToken(user)
  })
})

app.post('/sessions/create', (req, res) => {

  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password")
  }
  const user = dummy.findUser(req.body.username)

  console.log(dummy.checkPassword(req.body.username, req.body.password))
  if (dummy.checkPassword(req.body.username, req.body.password) == false) {
    return res.status(401).send("The username or password don't match")
  }

  res.status(201).send({
    id_token: createToken(user)
  })
})

/**
passport.use(‘local’, new LocalStrategy(
  function(username, password, done) {
    let checkPassword = User.checkPassword(username, password)
    let getUser = checkPassword.then( (is_login_valid) => {
      if(is_login_valid){
        return User.findUser( username )
      } else {
        throw new Error(“invalid username or password”)
      }
    })
    .then( ( user ) => {
      return done(null, user)
    })
    .catch( (err) => {
      return done(err)
    })
  }
))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.getById(id).then( (user, err) => {
    return done(err, user)
  })
})
*/
