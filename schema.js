'use strict'

const typeDefinitions = `
type User {
  name: String
  password: String
  userid: Int
}
type RootQuery {
  user(name: String, password: String): User
}
type Mutation {
  addUser(name: String, password: String): User
}
schema {
  query: RootQuery
  mutation: Mutation
}
`;

module.exports = [typeDefinitions]
