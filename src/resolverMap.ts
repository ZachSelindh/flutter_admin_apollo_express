import mongoose from 'mongoose';
import User from './db/models/user';

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
          return result;
      } catch (err) {
        console.log('Error at createUser:', err);
        throw err;
      }
    },
    updateUser: async (_, { _id, ...rest }) => {
      try {
        let user = await User.findOneAndUpdate({ _id: _id }, { _id, ...rest }, {
          new: true
        });
          
          return user;
      } catch (err) {
        console.log('Error at updateUser:', err);
        throw err;
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        let deletedUser = await User.deleteOne({ _id });
          
          return deletedUser;
      } catch (err) {
        console.log('Error at deleteUser:', err);
        throw err;
      }
    },
  }
};

export default resolverMap;