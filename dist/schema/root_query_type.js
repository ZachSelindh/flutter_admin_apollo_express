import * as graphql from 'graphql';
import * as mongoose from 'mongoose';
import { UserType } from './types';
import '../db/models/user';
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const User = mongoose.model('user');
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve: async () => {
                console.log("Get users");
                const result = await User.find({});
                console.log('result', result);
                return result;
                // await User.find({});
            },
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parnetValue, { id }) => {
                await User.findById(id);
            },
        },
    }),
});
export { RootQuery };
