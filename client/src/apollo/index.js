import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as fetch from 'cross-fetch';

const BASE_URL = 'http://localhost:8081';
const GRAPHQL_ENDPOINT = 'api/graphql';

export function createApolloClient(context) {
	const isServer = !!context;

	const httpLink = createHttpLink({
		uri: `${BASE_URL}/${GRAPHQL_ENDPOINT}`,
		fetch,
	});

	const cache = new InMemoryCache();

	if (!isServer && window.__APOLLO_STATE__) {
		cache.restore(window.__APOLLO_STATE__);
		delete window.__APOLLO_STATE__;
	}

	return new ApolloClient({
		link: httpLink,
		cache,
	});
}
