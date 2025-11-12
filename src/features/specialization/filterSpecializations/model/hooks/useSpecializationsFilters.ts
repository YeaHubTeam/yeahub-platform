import { useQueryFilterParams } from '@/shared/hooks';

import { SpecializationsFilterParams } from '../types/filters';

import { useGetSpecializationsFilterParams } from './useGetSpecializationsFilterParams';

export const useSpecializationsFilters = (
	initialParams: SpecializationsFilterParams,
	options?: { userId?: string | null },
) => {
	const currentParams = useGetSpecializationsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } =
		useQueryFilterParams<SpecializationsFilterParams>(initialParams, currentParams);

	const isMyEffective = filters.isMy && options?.userId;

	const normalizedFilters: SpecializationsFilterParams = {
		...filters,
		isMy: Boolean(isMyEffective),
	};

	const hasFilters =
		(normalizedFilters.page || 1) > 1 ||
		Boolean(normalizedFilters.title) ||
		Boolean(normalizedFilters.author) ||
		normalizedFilters.isMy;

	const onChangeTitle = (title: SpecializationsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangePage = (page: SpecializationsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeAuthor = (author?: SpecializationsFilterParams['author']) => {
		onFilterChange({ author, isMy: false, page: 1 });
	};

	const onChangeIsMy = (isMy?: SpecializationsFilterParams['isMy']) => {
		onFilterChange({ author: undefined, isMy: !!isMy, page: 1 });
	};

	return {
		filters: normalizedFilters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangeAuthor,
		onChangePage,
		onChangeIsMy,
	};
};
