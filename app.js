'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Mongoose = require('mongoose')

const PORT = 8080
const app = express()
const apolloExpress = require('apollo-server').apolloExpress
const graphiqlExpress = require('apollo-server').graphiqlExpress
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
//const passport = require('passport')
const graphql = require('graphql')
const session = require('express-session')
const uuid = require('node-uuid')
const Schema = require('./schema')
const Resolvers = require('./resolvers')
const Connectors = require('./connectors')


Mongoose.Promise = global.Promise
Mongoose.connect('mongodb://localhost/apollo', (err) => {
  if (err) {
    return err;
  }
  return true;
})

const seed = require('./seed')

seed()
/*
app.use(session({
 genid: function(req) {
   return uuid.v4();
 },
 secret: "Z3]GJW!?9uP”/Kpe"
}))
app.use(passport.initialize())
app.use(passport.session())



*/
//app.post('/graphql', (req, res) => {
//  graphql(Schema, req.body, { user: req.user })
  //.then((data) => {
  //  res.send(JSON.stringify(data))
//  })
//})

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
/**
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
**/

app.use(require('./auth'))

app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {
    constructor: Connectors,
  },
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
))
