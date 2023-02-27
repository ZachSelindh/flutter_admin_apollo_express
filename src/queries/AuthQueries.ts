import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../db/models/User';

class AuthQueries {
  static loginQuery = async (_, { username, password }) => {
    try {
      const user = await User.findOne({ username });
      let tempToken;
      await bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          throw error;
        }
        if (isMatch) {
          const token = jwt.sign(
            {
              username: user.username,
              password: user.password,
              role: user.role || 'USER',
            },
            process.env.JWT_SECRET
          );
          tempToken = token;
        }
      });
      if (tempToken) {
        console.log('HIT', tempToken);
        return tempToken;
      }
      throw new Error('Failed authentication');
    } catch (err) {
      console.log('Error at login:', err);
      throw err;
    }
  };
}

export default AuthQueries;
