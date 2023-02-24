export const typeDefs = `#graphql
  directive @auth(
    requires: Role = ADMIN,
  ) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    role: String!
    posts: [Post]
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    helloWorld: String!
    getUser(_id: ID!): User
    getUsers: [User!]
    getPost(_id: ID!): Post
    getPosts: [Post!]
    getPostsForUser(userID: ID!): [Post]
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type userMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type postMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    post: Post
  }

  type Mutation {
    createUser(name: String!, email: String!): userMutationResponse!
    updateUser(_id: ID!, name: String!, email: String!): userMutationResponse!
    deleteUser(_id: ID!): userMutationResponse!
    createPost(title: String!, content: String! userID: ID!): postMutationResponse!
  }
`;
