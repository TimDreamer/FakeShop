import {
	CHANGE_SELECTED,
	SAVE_PRODUCTS,
	ADD_PRODUCTS_TO_CART,
	CHANGE_QTY,
	CLEAR_ALL,
} from '../types';

import { sortByBrand } from '@/utils';

const shoppingUtils = {
	spliceProductInCart(id) {
		const idx = state.productsInCart.findIndex((p) => p.id === id);
		if (idx === -1) {
			throw new Error('Product should be in cart but not');
		}
		const product = state.productsInCart.splice(idx, 1)[0];
		return [product, state.productsInCart];
	},
	reAssignCart(arr, newProduct, compare) {
		return compare
			? [...arr, newProduct].sort(compare)
			: [...arr, newProduct];
	},
};

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
	getProductsInCart(state) {
		return state.productsInCart;
	},
	getQrtTotal(state) {
		return state.productsInCart.reduce((acc, p) => {
			return acc + p.qty;
		}, 0);
	},
	getQrtPriceTotal(state) {
		return state.productsInCart.reduce((acc, p) => {
			return acc + p.qty * p.price;
		}, 0);
	},
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
			state.productsInCart = shoppingUtils.reAssignCart(
				state.productsInCart,
				product,
				sortByBrand
			);
		}

		product.qty += qty;
		product.countInStock -= qty;
	},
	[CHANGE_QTY](state, { id, newQty }) {
		const [product, productsInCart] = shoppingUtils.spliceProductInCart(id);
		const qtyDiff = product.qty - newQty;
		product.qty = newQty;
		product.countInStock += qtyDiff;
		state.productsInCart = shoppingUtils.reAssignCart(
			productsInCart,
			product,
			sortByBrand
		);
	},
	[CLEAR_ALL](_, { id }) {
		const [product] = shoppingUtils.spliceProductInCart(id);
		product.countInStock += product.qty;
		product.qty = 0;
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
	[CHANGE_QTY]({ commit }, payload) {
		commit(CHANGE_QTY, payload);
		return Promise.resolve();
	},
	[CLEAR_ALL]({ commit }, payload) {
		commit(CLEAR_ALL, payload);
		return Promise.resolve();
	},
};

export default { state, getters, mutations, actions };
