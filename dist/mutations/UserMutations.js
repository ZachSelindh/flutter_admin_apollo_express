var _a;
import mongoose from 'mongoose';
import User from '../db/models/user';
class UserMutations {
}
_a = UserMutations;
UserMutations.createUserMutation = async (_, { name, email }) => {
    try {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
        });
        const result = await user.save();
        return {
            code: '200',
            success: true,
            message: `Successfully created user ID ${result._id}`,
            user: result,
        };
    }
    catch (err) {
        return {
            code: '400',
            success: false,
            message: `Error at user create: ${err}`,
        };
    }
};
UserMutations.updateUserMutation = async (_, { _id, ...rest }) => {
    try {
        const user = await User.findOneAndUpdate({ _id }, { _id, ...rest }, {
            new: true,
        });
        if (user) {
            return {
                code: '200',
                success: true,
                message: `Successfully updated user ID ${user._id}`,
                user,
            };
        }
        return {
            code: '404',
            success: false,
            message: `User not found for id ${_id}`,
        };
    }
    catch (err) {
        return {
            code: '400',
            success: false,
            message: `Error at user update: ${err}`,
        };
    }
};
UserMutations.deleteUserMutation = async (_, { _id }) => {
    try {
        const deletedUser = await User.deleteOne({ _id });
        if (0 < deletedUser?.deletedCount) {
            return {
                code: '200',
                success: true,
                message: `Successfully deleted user ID ${_id}`,
            };
        }
        if (deletedUser?.acknowledged) {
            return {
                code: '404',
                success: false,
                message: `User not found for id ${_id}`,
            };
        }
        return {
            code: '404',
            success: false,
            message: `Unknown error at user delete`,
        };
    }
    catch (err) {
        return {
            code: '400',
            success: false,
            message: `Error at user delete: ${err}`,
        };
    }
};
export default UserMutations;
