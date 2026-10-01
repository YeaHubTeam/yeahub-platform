import { ArticlesFilterParams } from '@/entities/article';

export const useGetArticlesFilterParams = (initialParams: ArticlesFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: ArticlesFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
	};

	return currentParams;
};
