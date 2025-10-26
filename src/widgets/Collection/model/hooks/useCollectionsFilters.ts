import { useQueryFilterParams } from '@/shared/hooks';

import { useGetCollectionsFilterParams } from '../hooks/useGetCollectionsFilterParams';
import { CollectionsFilterParams } from '../types/types';

export const useCollectionsFilters = (initialParams: CollectionsFilterParams) => {
	const currentParams = useGetCollectionsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<CollectionsFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 || Boolean(filters.title) || Boolean(filters.specialization);

	const onChangeTitle = (title: CollectionsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSpecialization = (specialization: CollectionsFilterParams['specialization']) => {
		onFilterChange({
			specialization,
			page: 1,
		});
	};

	const onChangePage = (page: CollectionsFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangeSpecialization,
		onChangePage,
	};
};
