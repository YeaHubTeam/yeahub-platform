import { useQueryFilter } from '@/shared/hooks';

export const useCollectionsFilters = () => {
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();

	const onChangeSearchParams = (value: string) => {
		handleFilterChange({ title: value });
	};

	const onChangeSpecialization = (specialization: number | number[]) => {
		handleFilterChange({
			specialization: Array.isArray(specialization) ? specialization : [specialization],
			page: 1,
		});
	};

	const onChangeIsFree = (isFree: boolean) => {
		handleFilterChange({ isFree: isFree, page: 1 });
	};

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
	};

	return {
		filter,
		resetFilters,
		onChangeSearchParams,
		onChangeSpecialization,
		onChangeIsFree,
		onPageChange,
	};
};
