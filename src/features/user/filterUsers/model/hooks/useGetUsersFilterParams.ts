import { UsersFilterParams } from '../types/filters';

export const useGetUsersFilterParams = (initialParams: UsersFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: UsersFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		search: parsedParams.search || initialParams.search,
		isVerified: parsedParams.isVerified
			? Boolean(parsedParams.isVerified)
			: initialParams.isVerified,
		roles: parsedParams.roles ? parsedParams.roles.split(',').map(Number) : initialParams.roles,
	};

	return currentParams;
};
