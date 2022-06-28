import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloProvider from './apollo';

Vue.use(VueRouter);

Vue.filter('currency', (val) => '$' + val.toLocaleString());

new Vue({
	router,
	store,
	apolloProvider,
	render: (h) => h(App),
}).$mount('#app');
