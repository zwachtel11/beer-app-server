'use strict'
const UserModel = require('./model')
let countWontWorkTho = 0
class User {
  constructor() {
    this.addUser = (name, password) => {
      countWontWorkTho++
      const user = new UserModel({
        name: name,
        password: password,
        userid: countWontWorkTho
      })
      user.save((err, item) => {
        console.log('saved:', item)
      })
      return user
    }
    this.findUser = (name) => {
      const person = UserModel.findOne({ name }, (error, data) => {
        return data
      })
      return person
    }
    this.checkPassword = (name, password) => {
      const person = this.findUser(name)
      // checkout schema 
      console.log(person)

      return (password == person.password)
    }
    this.findById = (id) => {
      const person = UserModel.findById(id, (error, data) => {
        return data
      })
      return person
    }
  }
}

module.exports = { User }
