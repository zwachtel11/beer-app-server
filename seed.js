'use strict'


const request = require('request-promise')
const User = require('./model')
/**
const seed = () => {
  request('https://mysafeinfo.com/api/data?list=presidents&format=json')
    .then(res => JSON.parse(res))
    .then((res) => {
      const data = res.map((r) => {
        const obj = {}
        obj.name = r.nm
        obj.party = r.pp
        obj.term = r.tm
        return obj
      })
      data.forEach((d) => {
        const president = new President(d)
        president.save((err, item) => {
          console.log('saved:', item)
        })
      })
    })
    .catch((err) => {
      console.log('err:', err)
    })
}
**/

const seed = () => {
  const obj = {'name': 'zach', 'password': 'yoyoyo'}
  const user = new User(obj)
  user.save((err, item) => {
    console.log('saved:', item)
  })
}

module.exports = seed
