'use strict'

const resolveFunctions = {
  RootQuery: {
    user(_, name, ctx) {
      const user = new ctx.constructor.User()
      return user.findUser(name.name)
    },
  },
  Mutation: {
    addUser(_, forms) {
      const user = new ctx.constructor.User()
      return user.addUser(forms.name, forms.password)
    },
  },
}

module.exports = resolveFunctions
