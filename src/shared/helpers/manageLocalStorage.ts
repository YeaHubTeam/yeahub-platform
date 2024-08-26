export const setToLS = (key: string, value: unknown) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key: string) => {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item) : null;
};

export const removeFromLS = (key: string) => {
	localStorage.removeItem(key);
};
