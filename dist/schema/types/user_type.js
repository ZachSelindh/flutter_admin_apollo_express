import * as graphql from 'graphql';
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});
export { UserType };
