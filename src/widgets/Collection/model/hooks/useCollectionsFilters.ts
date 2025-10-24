import { useQueryFilterParams } from '@/shared/hooks';

import { useGetCollectionsFilterParams } from '../hooks/useGetCollectionsFilterParams';
import { CollectionsFilterParams } from '../types/types';

export const useCollectionsFilters = (initialParams: CollectionsFilterParams) => {
	const currentParams = useGetCollectionsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<CollectionsFilterParams>(
		initialParams,
		currentParams,
	);

	const onChangeSearchParams = (title: string) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSpecialization = (specialization: number) => {
		onFilterChange({
			specialization,
			page: 1,
		});
	};

	const onChangePage = (page: number) => {
		onFilterChange({ page });
	};

	return {
		filters,
		onResetFilters,
		onChangeSearchParams,
		onChangeSpecialization,
		onChangePage,
	};
};
