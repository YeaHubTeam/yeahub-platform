import { useLocation, useNavigate } from 'react-router-dom';

import { TestQuestionsFilterParams } from '../types/filters';

import { useGetTestQuestionsFilterParams } from './useGetTestQuestionsFilterParams';

export const useTestQuestionsFilters = (initialParams: TestQuestionsFilterParams) => {
	const filters = useGetTestQuestionsFilterParams(initialParams);
	const location = useLocation();
	const navigate = useNavigate();

	const getSearchParams = (values: TestQuestionsFilterParams, search = '') => {
		const params = new URLSearchParams(search);

		Object.entries(values).forEach(([key, value]) => {
			const param = Array.isArray(value) ? value.join(',') : value;
			if (param === undefined || param === false || param === '') {
				params.delete(key);
			} else {
				params.set(key, String(param));
			}
		});

		return params.toString();
	};

	const onFilterChange = (updates: Partial<TestQuestionsFilterParams>) => {
		navigate({
			search: getSearchParams({ ...filters, ...updates }, location.search),
			hash: location.hash,
		});
	};

	const onResetFilters = () => {
		navigate({ search: getSearchParams(initialParams), hash: location.hash }, { replace: true });
	};

	const hasFilters = Boolean(
		(filters.page || 1) > 1 ||
		filters.isMy ||
		filters.authorId ||
		filters.specialization ||
		filters.skills?.length ||
		filters.complexity?.length ||
		filters.rate?.length,
	);

	const onChangePage = (page?: number) => {
		onFilterChange({ page });
	};

	const onChangeIsMy = (isMy?: boolean) => {
		onFilterChange({ isMy, authorId: undefined, page: 1 });
	};

	const onChangeAuthorId = (authorId?: string) => {
		onFilterChange({ authorId, page: 1 });
	};

	const onChangeSpecialization = (specialization?: number) => {
		onFilterChange({ specialization, skills: undefined, page: 1 });
	};

	const onChangeSkills = (skills?: number[]) => {
		onFilterChange({ skills, page: 1 });
	};

	const onChangeComplexity = (complexity?: number[]) => {
		onFilterChange({ complexity, page: 1 });
	};

	const onChangeRate = (rate?: number[]) => {
		onFilterChange({ rate, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeIsMy,
		onChangeAuthorId,
		onChangeSpecialization,
		onChangeSkills,
		onChangeComplexity,
		onChangeRate,
	};
};
