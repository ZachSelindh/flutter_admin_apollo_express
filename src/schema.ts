export const typeDefs = `#graphql
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Query {
    helloWorld: String!
    getUser(_id: ID!): User
    getUsers: [User]!
  }

  type Mutation {
    createUser(name:String!, email:String!): User!
    updateUser(_id: ID!, name:String!, email:String!): User!
    deleteUser(_id: ID!): User!
  }
`;