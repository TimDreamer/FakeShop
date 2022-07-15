import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import apolloProvider from '@/apollo';
import TrashSvg from '@/components/Icons/TrashSvg';
import ScrollWrapper from '@/components/ScrollWrapper';
import SpinnerWrapper from '@/components/SpinnerWrapper';

Vue.use(VueRouter);

Vue.component('trash-svg', TrashSvg);
Vue.component('scroll-wrapper', ScrollWrapper);
Vue.component('spinner-wrapper', SpinnerWrapper);

Vue.filter('currency', (val) => '$' + val.toLocaleString());

new Vue({
	router,
	store,
	apolloProvider,
	render: (h) => h(App),
}).$mount('#app');
