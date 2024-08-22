export const getAccessToken = () => {
	return localStorage.getItem('accessToken') ?? null;
};
