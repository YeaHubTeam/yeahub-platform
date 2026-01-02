import { SkillsFilterParams } from '../../model/types/filters';

export const useGetSkillsFilterParams = (initialParams: SkillsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: SkillsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
	};

	return currentParams;
};
