var _a;
import Post from '../db/models/Post';
class PostQueries {
}
_a = PostQueries;
PostQueries.getPostQuery = async (_, { _id }) => {
    try {
        const post = await Post.findById(_id);
        return post;
    }
    catch (err) {
        console.log('Error at get Post:', err);
        throw err;
    }
};
PostQueries.getPostsQuery = async (_, args) => {
    try {
        const posts = await Post.find({});
        return posts;
    }
    catch (err) {
        console.log('Error at get Post:', err);
        throw err;
    }
};
PostQueries.getPostsForUserQuery = async (_, { userID }) => {
    try {
        const posts = await Post.find({ authorID: userID });
        return posts;
    }
    catch (err) {
        console.log('Error at get Posts for user:', err);
        throw err;
    }
};
export default PostQueries;
