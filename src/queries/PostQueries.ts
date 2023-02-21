import Post from '../db/models/post';

class PostQueries {
  static getPostsForUserQuery = async (_, { userID }) => {
    try {
      const posts = await Post.find({ authorID: userID });
      return posts;
    } catch (err) {
      console.log('Error at get Posts:', err);
      throw err;
    }
  };
}

export default PostQueries;
