export const calculatePagination = <T>(data: T[], page: number, limit: number): T[] => {
	const start = (page - 1) * limit;
	const end = page * limit;
	return data.slice(start, end);
};
