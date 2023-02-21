import mongoose from 'mongoose';
import Post from '../db/models/post';
import User from '../db/models/user';

class PostMutations {
    static createPostMutation = async (_, { title, content, userID }) => {
        try {
          const mongooseUserID = new mongoose.Types.ObjectId(userID);
    
          let post = new Post({
            _id: new mongoose.Types.ObjectId,
            title,
            content,
            author: mongooseUserID
          });
    
          let newPost = await post.save();
    
          if (newPost) {
    
            if (mongooseUserID) {
              const currentUser = await User.findById(userID);
    
              if (currentUser) {
                const updatedUser = await User.updateOne({ _id: userID }, { ...currentUser, posts: [...currentUser.posts, newPost] });
    
                if (updatedUser?.modifiedCount > 0) {
                  return { code: "200", success: true, message: `Successfully created post ID ${newPost._id}`, post: newPost };
                }
    
                return { code: "404", success: false, message: `User not ID ${userID} not updated` }
              }
            }
            return { code: "404", success: false, message: `User not found for ID ${userID}` };
    
          }
          return { code: "400", success: false, message: `Problem creating post!` }; 
        } catch (err) {
          return { code: "400", success: false, message: `Error at post create: ${err}` };
        }
      }
}


export default PostMutations;
 