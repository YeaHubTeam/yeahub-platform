export const route = (path: string, ...params: Array<string | number>) => {
	let count = -1;
	return path.replace(/:[a-zA-Z?]+/g, function (match) {
		count += 1;
		return String(params[count] !== undefined ? params[count] : match);
	});
};
