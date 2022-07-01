import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const BASE_URL = 'http://localhost:8081';
const GRAPHQL_ENDPOINT = 'api/graphql';

const httpLink = createHttpLink({
	uri: `${BASE_URL}/${GRAPHQL_ENDPOINT}`,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

export default new VueApollo({
	defaultClient: apolloClient,
});
