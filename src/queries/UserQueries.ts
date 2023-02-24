import User from '../db/models/user';

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

  static getUsersQuery = async () => {
    try {
      const users = await User.find({});
      return users;
    } catch (err) {
      console.log('Error at get Users:', err);
      throw err;
    }
  };

  //   static loginQuery = async (_, { username, password }) => {
  //     let user = Data.users.find((user) => user.username === username && user.password === password);
  //     if (!user) {
  //         throw new Error('unknown user!');
  //     }

  //     const token = jwt.sign({ username: user.username, password: user.password, role: user.role }, 'mysecrete');
  //     return token;
  // }
}

export default UserQueries;
