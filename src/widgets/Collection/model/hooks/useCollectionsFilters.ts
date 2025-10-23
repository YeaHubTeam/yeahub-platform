import { useQueryFilterParams } from '@/shared/hooks';

import { CollectionsFilterParams } from '@/widgets/Collection';

export const useCollectionsFilters = (initialParams: CollectionsFilterParams) => {
	const { filter, onFilterChange, onResetFilters } =
		useQueryFilterParams<CollectionsFilterParams>(initialParams);

	const onChangeSearchParams = (title: string) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSpecialization = (specialization: number) => {
		onFilterChange({
			specialization,
			page: 1,
		});
	};

	// const onChangeIsFree = (isFree: boolean) => {
	// 	onFilterChange({ isFree, page: 1 });
	// };

	const onChangePage = (page: number) => {
		onFilterChange({ page });
	};

	return {
		filter,
		onResetFilters,
		onChangeSearchParams,
		onChangeSpecialization,
		// onChangeIsFree,
		onChangePage,
	};
};
