import Vue from 'vue';
import Vuex from 'vuex';
import shoppingCart from '@/store/modules/shoppingCart';

Vue.use(Vuex);

export function createStore() {
	return new Vuex.Store({
		modules: { shoppingCart },
	});
}
