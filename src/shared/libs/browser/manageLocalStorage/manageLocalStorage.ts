export const setToLS = (key: string, value: unknown) => {
	try {
		const transformedValue = typeof value === 'string' ? value : JSON.stringify(value);
		localStorage.setItem(key, transformedValue);
	} catch {
		return;
	}
};

export const getFromLS = (key: string) => {
	return localStorage.getItem(key);
};

export const getJSONFromLS = (key: string) => {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	} catch {
		return null;
	}
};

export const removeFromLS = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch {
		return;
	}
};
