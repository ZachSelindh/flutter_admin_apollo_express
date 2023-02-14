import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolverMap';
import { GraphQLSchema } from 'graphql';

const typeDefs = `#graphql
  type Query {
    helloWorld: String!
  }
`;

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;