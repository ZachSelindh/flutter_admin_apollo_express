import * as jwt from 'jsonwebtoken';
import User from '../db/models/User';

class AuthQueries {
  static loginQuery = async (_, { username, password }) => {
    try {
      const user = await User.find({ username, password });
      console.log('user', user);
      return user;
      // if (user) {
      //   const token = jwt.sign(
      //     { username: user.username, password: user.password, role: user.role },
      //     process.env.JWT_SECRET
      //   );
      //   return token;
      // }
    } catch (err) {
      console.log('Error at login:', err);
      throw err;
    }
  };
}

export default AuthQueries;
