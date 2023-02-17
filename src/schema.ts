export const typeDefs = `#graphql
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Query {
    helloWorld: String!
    user: User!
    users: [User]!
  }

  type Mutation {
    createUser(name:String!, email:String!): User!
    updateUser(_id: ID!, name:String!, email:String!): User!
    deleteUser(_id: ID!): User!
  }
`;