import mongoose from 'mongoose';
import User from './db/models/user';

const resolverMap = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    users: async () => {
      try {
        let result = await User.find({});
        return result;
      } catch (err) {
        console.log('Error:', err);
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
        console.log('Error:', err);
        throw err;
      }
    },
  }
};

export default resolverMap;