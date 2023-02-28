import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../db/models/UserModel';
import Session from '../db/models/SessionModel';

class AuthMutations {
  static clearUserSessions = async userID => {
    await Session.deleteMany({ user: userID });
  };

  static loginMutation = async (_, { username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user)
        return {
          code: '404',
          success: false,
          message: `No user found with username ${username}`,
        };
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

        await this.clearUserSessions(user._id);

        const session = new Session({
          _id: new mongoose.Types.ObjectId(),
          user,
          token,
          started_at: new Date(),
          expires_at: new Date().setHours(new Date().getHours() + 1),
        });

        const sessionResult = await session.save();

        return {
          code: '200',
          success: true,
          message: `Successfully logged in user ${username}`,
          token,
          session: sessionResult,
        };
      }
      return {
        code: '400',
        success: false,
        message: `Authentication failed for user ${username}`,
      };
    } catch (err) {
      return {
        code: '400',
        success: false,
        message: `Error at login: ${err}`,
      };
    }
  };

  static logoutMutation = async (_, { _id }) => {
    await this.clearUserSessions(_id);

    return {
      code: '200',
      success: true,
      message: `Successfully logged out user ID ${_id}`,
    };
  };
}

export default AuthMutations;
