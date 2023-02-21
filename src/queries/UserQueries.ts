import User from '../db/models/user';

class UserQueries {
  static getUserQuery = async (_, { _id }) => {
    try {
      let user = await User.findById(_id);
      return user;
    } catch (err) {
      console.log('Error at get User:', err);
      throw err;
    }
  }
  
  static getUsersQuery = async () => {
    try {
      let users = await User.find({});
      return users;
    } catch (err) {
      console.log('Error at get Users:', err);
      throw err;
    }
  }
}

export default UserQueries;