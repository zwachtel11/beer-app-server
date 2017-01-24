'use strict'

const Mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./config')

const UserSchema = Mongoose.Schema({
  name: String,
  password: String,
  userid: Number
})

UserSchema.methods.checkPassword = (password) => {
  return (password === this.password)
}
UserSchema.methods.createToken = () => {
  return jwt.sign(this, config.secret, { expiresIn: 60*60*5})
} 

const User = Mongoose.model('User', UserSchema)

module.exports = User
