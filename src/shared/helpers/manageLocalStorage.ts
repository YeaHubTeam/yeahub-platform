export const setToLS = (key: string, value: unknown) => {
	const transformedValue = typeof value === 'string' ? value : JSON.stringify(value);
	localStorage.setItem(key, transformedValue);
};

export const getFromLS = (key: string) => {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(JSON.stringify(item)) : null;
};

export const removeFromLS = (key: string) => {
	localStorage.removeItem(key);
};
