export const debounce = (cb, delay = 500) => {
	let timeout = null;

	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			cb(...args);
		}, delay);
	};
};

export const sortByBrand = (a, b) => {
	const brandA = a.brand.toLowerCase();
	const brandB = b.brand.toLowerCase();
	return brandA > brandB ? 1 : brandA < brandB ? -1 : a.name > b.name;
};
