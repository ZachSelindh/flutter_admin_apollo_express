import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import 'graphql-import-node';

import * as schema from './schema/index.graphql';

const app = express();

const documentSchema = schema as any;

const server = new ApolloServer({
  schema: documentSchema,
  validationRules: [depthLimit(7)],
});

app.use('*', cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen(
  { port: 3000 },
  (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));