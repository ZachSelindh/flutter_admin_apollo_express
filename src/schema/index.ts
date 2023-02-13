import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolverMap';
import { GraphQLSchema } from 'graphql';
import * as typeDefs from './schema.graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;