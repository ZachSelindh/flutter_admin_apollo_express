var _a;
// import jwt from 'jsonwebtoken';
import User from '../db/models/user';
class AuthQueries {
}
_a = AuthQueries;
AuthQueries.loginQuery = async (_, { username, password }) => {
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
    }
    catch (err) {
        console.log('Error at login:', err);
        throw err;
    }
};
export default AuthQueries;
