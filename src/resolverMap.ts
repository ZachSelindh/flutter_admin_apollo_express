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
    getPost: PostQueries.getPostQuery,
    getPosts: PostQueries.getPostsQuery,
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
