import User from '../db/models/User';

class UserQueries {
  static getUserQuery = async (_, { _id }) => {
    try {
      const user = await User.findById(_id);
      return user;
    } catch (err) {
      console.log('Error at get User:', err);
      throw err;
    }
  };

  static getUserByTokenQuery = async token => {
    console.log('token', token);
    // TODO: Get user session by token?
    // try {
    //   const user = await User.findById(_id);
    //   return user;
    // } catch (err) {
    //   console.log('Error at get User:', err);
    //   throw err;
    // }
    return null;
  };

  static getUsersQuery = async () => {
    try {
      const users = await User.find({});
      return users;
    } catch (err) {
      console.log('Error at get Users:', err);
      throw err;
    }
  };
}

export default UserQueries;
