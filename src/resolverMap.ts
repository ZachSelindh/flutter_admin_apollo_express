import UserMutations from './mutations/UserMutations';
import PostMutations from './mutations/PostMutations';
import PostQueries from './queries/PostQueries';
import UserQueries from './queries/UserQueries';

const resolverMap = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    getUser: UserQueries.getUserQuery,
    getUsers: UserQueries.getUsersQuery,
    getPostsForUser: PostQueries.getPostsForUserQuery,
  },
  Mutation: {
    createUser: UserMutations.createUserMutation,
    updateUser: UserMutations.updateUserMutation,
    deleteUser: UserMutations.deleteUserMutation,
    createPost: PostMutations.createPostMutation,
  },
};

export default resolverMap;
