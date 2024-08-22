export const manageLocalStorage = (key: string) => {
	const setStoredItem = (value: unknown) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	const getStoredItem = () => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	const removeStoredItem = () => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	return { setStoredItem, getStoredItem, removeStoredItem };
};
