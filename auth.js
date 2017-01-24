'use strict'

const passport = require('passport')
const UserConnector = require('./connectors').User
const UserModel = require('./model')
const express = require('express')
const app = module.exports = express.Router()

const dummy = new UserConnector()

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
  const name = req.body.username
  const password = req.body.password
  const user = UserModel.findOne({name}) (error, data) => {
    return data
  })

  console.log(user)
  if (user.checkPassword(req.body.password) === false) {
    return res.status(401).send("The username or password don't match")
  }

  res.status(201).send({
    id_token: user.createToken()
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
