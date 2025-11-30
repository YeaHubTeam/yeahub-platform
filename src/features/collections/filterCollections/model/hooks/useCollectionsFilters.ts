import { useQueryFilterParams } from '@/shared/hooks';

import { CollectionsFilterParams } from '../types/types';

import { useGetCollectionsFilterParams } from './useGetCollectionsFilterParams';

export const useCollectionsFilters = (initialParams: CollectionsFilterParams) => {
	const currentParams = useGetCollectionsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<CollectionsFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		Boolean(filters.specialization) ||
		Boolean(filters.authorId);

	const onChangeTitle = (title: CollectionsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSpecialization = (specialization: CollectionsFilterParams['specialization']) => {
		onFilterChange({
			specialization,
			page: 1,
		});
	};

	const onChangeIsFree = (isFree: CollectionsFilterParams['isFree']) => {
		onFilterChange({
			isFree,
			page: 1,
		});
	};

	const onChangePage = (page: CollectionsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeAuthor = (authorId?: CollectionsFilterParams['authorId']) => {
		onFilterChange({ authorId, page: 1 });
	};

	//added
	const onChangeIsMy = (isMy: CollectionsFilterParams['isMy']) => {
		onFilterChange({
			isMy,
			page: 1,
		});
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangeSpecialization,
		onChangeIsFree,
		onChangePage,
		onChangeAuthor,
		onChangeIsMy,
	};
};
