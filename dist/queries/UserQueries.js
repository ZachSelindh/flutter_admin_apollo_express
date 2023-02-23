var _a;
import User from '../db/models/user';
class UserQueries {
}
_a = UserQueries;
UserQueries.getUserQuery = async (_, { _id }) => {
    try {
        const user = await User.findById(_id);
        return user;
    }
    catch (err) {
        console.log('Error at get User:', err);
        throw err;
    }
};
UserQueries.getUsersQuery = async () => {
    try {
        const users = await User.find({});
        return users;
    }
    catch (err) {
        console.log('Error at get Users:', err);
        throw err;
    }
};
export default UserQueries;
