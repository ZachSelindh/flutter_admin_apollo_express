import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../db/models/User';

class AuthQueries {
  static loginQuery = async (_, { username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error('No user with that username found!');
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        const token = jwt.sign(
          {
            username: user.username,
            password: user.password,
            role: user.role || 'USER',
          },
          process.env.JWT_SECRET
        );
        return token;
      }
      throw new Error('Failed authentication');
    } catch (err) {
      console.log('Error at login:', err);
      throw err;
    }
  };
}

export default AuthQueries;
