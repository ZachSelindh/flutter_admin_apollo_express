export const typeDefs = `#graphql
  type User {
    _id: ID!
    name: String!
    email: String!
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
    user: User
  }

  type postMutationResponse implements MutationResponse {
    post: Post
  }

  type Mutation {
    createUser(name: String!, email: String!): userMutationResponse!
    updateUser(_id: ID!, name: String!, email: String!): userMutationResponse!
    deleteUser(_id: ID!): userMutationResponse!
    createPost(title: String!, content: String! userID: ID!): postMutationResponse!
  }
`;
