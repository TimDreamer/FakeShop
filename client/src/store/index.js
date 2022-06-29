import Vue from 'vue';
import Vuex from 'vuex';
import shoppingCart from './modules/shoppingCart';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: { shoppingCart },
});
