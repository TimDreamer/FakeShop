import products from '../database';

export default {
	Query: {
		products() {
			return products;
		},
	},
	Mutation: {
		decProduct(_, { id }) {
			const product = products.find((p) => p.id === id);
			if (product.countInStock === 0) {
				throw new Error('Not enough product!');
			}
			product.countInStock--;
			return product;
		},
		incProduct(_, { id }) {
			const product = products.find((p) => p.id === id);
			product.countInStock++;
			return product;
		},
	},
};
