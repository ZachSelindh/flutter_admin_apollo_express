var _a;
import User from '../db/models/UserModel';
import Session from '../db/models/SessionModel';
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
UserQueries.getUserByTokenQuery = async (token) => {
    try {
        const session = await Session.findOne({ token });
        if (session?.expires_at instanceof Date &&
            new Date() < new Date(session?.expires_at)) {
            const user = await User.findById(session.user);
            if (user)
                return user;
        }
        await session.delete();
        return null;
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
