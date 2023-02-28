import { GraphQLScalarType } from 'graphql';
import UserMutations from './mutations/UserMutations';
import PostMutations from './mutations/PostMutations';
import AuthMutations from './mutations/AuthMutations';
import PostQueries from './queries/PostQueries';
import UserQueries from './queries/UserQueries';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    if ('string' === typeof value) return new Date(value);
  },
  serialize(value) {
    if (value instanceof Date) return value.toISOString();
  },
});

const resolverMap = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    getUser: UserQueries.getUserQuery,
    getUsers: UserQueries.getUsersQuery,
    getPost: PostQueries.getPostQuery,
    getPosts: PostQueries.getPostsQuery,
    getPostsForUser: PostQueries.getPostsForUserQuery,
  },
  Mutation: {
    login: AuthMutations.loginMutation,
    logout: AuthMutations.logoutMutation,
    createUser: UserMutations.createUserMutation,
    updateUser: UserMutations.updateUserMutation,
    deleteUser: UserMutations.deleteUserMutation,
    createPost: PostMutations.createPostMutation,
  },
  Date: dateScalar,
};

export default resolverMap;
