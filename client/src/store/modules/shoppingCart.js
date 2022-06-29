import { CHANGE_SELECTED, SAVE_PRODUCTS } from '../types';

const state = {
	products: [],
	selectedProduct: null,
};

const getters = {
	getSelectedProduct(state) {
		return state.selectedProduct;
	},
	getProducts(state) {
		return state.products;
	},
};

const mutations = {
	[SAVE_PRODUCTS](state, payload) {
		state.products = payload;
	},
	[CHANGE_SELECTED](state, id) {
		state.selectedProduct = state.products.find(
			(product) => product.id === id
		);
	},
};

const actions = {
	[SAVE_PRODUCTS]({ commit }, payload) {
		commit(SAVE_PRODUCTS, payload);
	},
	[CHANGE_SELECTED]({ commit }, id) {
		commit(CHANGE_SELECTED, id);
		return Promise.resolve();
	},
};

export default { state, getters, mutations, actions };
