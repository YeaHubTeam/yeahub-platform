export const getKeyboardFireEventObject = (keyName: string, keyCode: number) => {
	return {
		key: keyName,
		code: keyName,
		keyCode: keyCode,
		charCode: keyCode,
	};
};
