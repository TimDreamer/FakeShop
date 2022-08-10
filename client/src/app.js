import Vue from 'vue';
import App from '@/App.vue';
import { createRouter } from '@/router';
import { createStore } from '@/store';
import { sync } from 'vuex-router-sync';
import apolloProvider from '@/apollo';
import TrashSvg from '@/components/Icons/TrashSvg';
import ScrollWrapper from '@/components/ScrollWrapper';
import SpinnerWrapper from '@/components/SpinnerWrapper';

Vue.component('trash-svg', TrashSvg);
Vue.component('scroll-wrapper', ScrollWrapper);
Vue.component('spinner-wrapper', SpinnerWrapper);

Vue.filter('currency', (val) => '$' + val.toLocaleString());

Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$option;
		if (asyncData) {
			asyncData({
				store,
				route: to,
				apolloClient: apolloProvider.defaultClient,
			})
				.then(next)
				.catch(next);
		} else {
			next();
		}
	},
});

export function createApp() {
	const router = new createRouter();
	const store = new createStore();

	sync(store, router);

	const app = new Vue({
		router,
		store,
		apolloProvider,
		render: (h) => h(App),
	});

	return { app, router, store, apolloClient: apolloClient.defaultClient };
}
