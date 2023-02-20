import mongoose from 'mongoose';
import User from './db/models/user';
import Post from './db/models/post';

const resolverMap = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    getUser: async (_, { _id }) => {
      try {
        let user = await User.findById(_id);
        return user;
      } catch (err) {
        console.log('Error at get User:', err);
        throw err;
      }
    },
    getUsers: async () => {
      try {
        let users = await User.find({});
        return users;
      } catch (err) {
        console.log('Error at get Users:', err);
        throw err;
      }
    },
    getPostsForUser: async (_, { userID }) => {
      try {
        let posts = await Post.find({ authorID: userID });
        return posts;
      } catch (err) {
        console.log('Error at get Posts:', err);
        throw err;
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      try {
        let user = new User({
          _id: new mongoose.Types.ObjectId,
          name: name,
          email: email,
          });
          let result = await user.save();
          return { code: "200", success: true, message: `Successfully created user ID ${result._id}`, user: result };
      } catch (err) {
        return { code: "400", success: false, message: `Error at user create: ${err}` };
      }
    },
    updateUser: async (_, { _id, ...rest }) => {
      try {
        let user = await User.findOneAndUpdate({ _id: _id }, { _id, ...rest }, {
          new: true
        });

        console.log('user', user);

        return { code: "200", success: true, message: `Successfully updated user ID ${user._id}`, user };
      } catch (err) {
        return { code: "400", success: false, message: `Error at user update: ${err}` };
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        let deletedUser = await User.deleteOne({ _id });

        if (deletedUser?.deletedCount > 0) {
          return { code: "200", success: true, message: `Successfully deleted user ID ${_id}` };
        } else if (deletedUser?.acknowledged) {
          return { code: "404", success: false, message: `No user with id ${_id} found` };
        }

        return { code: "404", success: false, message: `Unknown error at user delete` };


      } catch (err) {
        return { code: "400", success: false, message: `Error at user delete: ${err}` };
      }
    },
  }
};

export default resolverMap;