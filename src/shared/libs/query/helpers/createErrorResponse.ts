export const createErrorResponse = <T>(message: T, statusCode: number, description: string) => {
	const error = {
		message,
		statusCode,
		description,
	};
	const option = {
		status: statusCode,
	};
	return { error, option };
};
