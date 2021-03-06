import { PORT } from './../config';
import { v4 } from 'uuid';

type Product = {
	id: string;
	name: string;
	imageURL: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
};

const products: Product[] = [
	{
		id: v4(),
		name: 'Airpods Wireless Bluetooth Headphones',
		imageURL: `http://localhost:${PORT}/images/airpods.jpg`,
		description:
			'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
		brand: 'Apple',
		category: 'Electronics',
		price: 89.99,
		countInStock: 3,
		rating: 3.5,
		numReviews: 0,
	},
	{
		id: v4(),
		name: 'iPhone 11 Pro 256GB Memory',
		imageURL: `http://localhost:${PORT}/images/phone.jpg`,
		description:
			'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
		brand: 'Apple',
		category: 'Electronics',
		price: 599.99,
		countInStock: 10,
		rating: 2.5,
		numReviews: 0,
	},
	{
		id: v4(),
		name: 'Cannon EOS 80D DSLR Camera',
		imageURL: `http://localhost:${PORT}/images/camera.jpg`,
		description:
			'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
		brand: 'Cannon',
		category: 'Electronics',
		price: 929.99,
		countInStock: 0,
		rating: 1.7,
		numReviews: 0,
	},
	{
		id: v4(),
		name: 'Sony Playstation 4 Pro White Version',
		imageURL: `http://localhost:${PORT}/images/playstation.jpg`,
		description:
			'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
		brand: 'Sony',
		category: 'Electronics',
		price: 399.99,
		countInStock: 10,
		rating: 4.9,
		numReviews: 0,
	},
	{
		id: v4(),
		name: 'Logitech G-Series Gaming Mouse',
		imageURL: `http://localhost:${PORT}/images/mouse.jpg`,
		description:
			'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
		brand: 'Logitech',
		category: 'Electronics',
		price: 49.99,
		countInStock: 7,
		rating: 3.6,
		numReviews: 0,
	},
	{
		id: v4(),
		name: 'Amazon Echo Dot 3rd Generation',
		imageURL: `http://localhost:${PORT}/images/alexa.jpg`,
		description:
			'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
		brand: 'Amazon',
		category: 'Electronics',
		price: 29.99,
		countInStock: 0,
		rating: 2.3,
		numReviews: 0,
	},
];

export default products;
