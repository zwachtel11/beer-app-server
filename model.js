'use strict'

const Mongoose = require('mongoose')

const UserSchema = Mongoose.Schema({
  name: String,
  password: String,
  userid: Number
})

const User = Mongoose.model('User', UserSchema)

module.exports = User
