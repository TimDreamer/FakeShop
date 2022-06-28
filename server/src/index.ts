import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { readFileSync } from 'fs';
import resolvers from './resolvers';
import { GRAPHQL_ENDPOINT, PORT } from './config';

const port = process.env.PORT || PORT;

const app = express();
app.use(express.static('static'));

const server = new ApolloServer({
	typeDefs: readFileSync(
		require.resolve('../schema/schema.graphql')
	).toString('utf-8'),
	resolvers,
});

server.applyMiddleware({ app, path: GRAPHQL_ENDPOINT });

app.listen({ port }, () => {
	console.log(`Server running on port ${port}`);
});
