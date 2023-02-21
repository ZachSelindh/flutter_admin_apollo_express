import mongoose from 'mongoose';
import User from '../db/models/user';

class UserMutations {
    static createUserMutation = async (_, { name, email }) => {
        try {
          let user = new User({
            _id: new mongoose.Types.ObjectId,
            name,
            email,
          });
          let result = await user.save();
          return { code: "200", success: true, message: `Successfully created user ID ${result._id}`, user: result };
        } catch (err) {
          return { code: "400", success: false, message: `Error at user create: ${err}` };
        }
    };

    static updateUserMutation = async (_, { _id, ...rest }) => {
        try {
          let user = await User.findOneAndUpdate({ _id: _id }, { _id, ...rest }, {
            new: true
          });
    
          if (user) {
            return { code: "200", success: true, message: `Successfully updated user ID ${user._id}`, user };
          }
    
          return { code: "404", success: false, message: `User not found for id ${_id}` };
    
        } catch (err) {
          return { code: "400", success: false, message: `Error at user update: ${err}` };
        }
      };

    static deleteUserMutation = async (_, { _id }) => {
        try {
          let deletedUser = await User.deleteOne({ _id });
    
          if (deletedUser?.deletedCount > 0) {
            return { code: "200", success: true, message: `Successfully deleted user ID ${_id}` };
          } else if (deletedUser?.acknowledged) {
            return { code: "404", success: false, message: `User not found for id ${_id}` };
          }
    
          return { code: "404", success: false, message: `Unknown error at user delete` };
    
        } catch (err) {
          return { code: "400", success: false, message: `Error at user delete: ${err}` };
        }
      }
}

export default UserMutations;