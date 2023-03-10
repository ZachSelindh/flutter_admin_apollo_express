import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './schema';
import UserQueries from './queries/UserQueries';
import resolverMap from './resolverMap';
import { dbConnection } from './db';

interface MyContext {
  token?: String;
  user?: {
    _id: String;
    name: String;
    email: String;
    role: String;
    posts: Array<any>;
  };
}

const app = express();

dbConnection.then(() => console.log('Connected to Mongoose'));

const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers: resolverMap,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(
  '/graphql',
  cors<cors.CorsRequest>(corsOptions),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      if ('IntrospectionQuery' === req?.body?.operationName)
        return req.headers.token;

      const token = req.headers.token || '';

      if (token) {
        const user = await UserQueries.getUserByTokenQuery(token);

        if (user) return { user };
      }
    },
  })
);

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-promise-executor-return
await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

console.log(`🚀 Server ready at Port ${PORT}`);
