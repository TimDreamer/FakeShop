import { CHANGE_SELECTED, SAVE_PRODUCTS, ADD_PRODUCTS_TO_CART } from '../types';

const state = {
	products: [],
	selectedProduct: null,
	productsInCart: [],
};

const getters = {
	getSelectedProduct(state) {
		return state.selectedProduct;
	},
	getProducts(state) {
		return state.products;
	},
	// getProductsInCart(state) {},
};

const mutations = {
	[SAVE_PRODUCTS](state, payload) {
		payload.forEach((p) => {
			p.qty = 0;
		});
		state.products = payload;
	},
	[CHANGE_SELECTED](state, id) {
		state.selectedProduct = state.products.find(
			(product) => product.id === id
		);
	},
	[ADD_PRODUCTS_TO_CART](state, { id, qty }) {
		let product = state.productsInCart.find((p) => p.id === id);
		if (!product) {
			product = state.products.find((p) => p.id === id);
			state.productsInCart.push(product);
		}

		product.qty += qty;
		product.countInStock -= qty;
	},
};

const actions = {
	[SAVE_PRODUCTS]({ commit }, payload) {
		commit(SAVE_PRODUCTS, payload);
		return Promise.resolve();
	},
	[CHANGE_SELECTED]({ commit }, id) {
		commit(CHANGE_SELECTED, id);
		return Promise.resolve();
	},
	[ADD_PRODUCTS_TO_CART]({ commit }, payload) {
		commit(ADD_PRODUCTS_TO_CART, payload);
		return Promise.resolve();
	},
};

export default { state, getters, mutations, actions };
