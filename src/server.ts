import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './schema';
import resolverMap from './resolverMap';
import { dbConnection } from './db';

interface MyContext {
  token?: String;
}

const app = express();

dbConnection.then(() => console.log("Connected to MongoDB"));

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
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);