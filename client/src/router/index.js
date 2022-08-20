import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';

Vue.use(VueRouter);

export function createRouter() {
	return new VueRouter({
		mode: 'history',
		routes,
		linkExactActiveClass: 'active',
	});
}
