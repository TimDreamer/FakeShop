import Home from '../pages/Home';
import Products from '../pages/Products';
import ShoppingCart from '../pages/ShoppingCart';

export default [
	{ name: 'HomePage', path: '/', component: Home },
	{ name: 'Products', path: '/products', component: Products },
	{ name: 'ShoppingCart', path: '/shopping-cart', component: ShoppingCart },
];
