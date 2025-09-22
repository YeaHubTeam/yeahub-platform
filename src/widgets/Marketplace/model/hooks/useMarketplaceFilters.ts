import { FilterFromUser, useQueryFilter } from '@/shared/hooks';

export const useMarketplaceFilters = () => {
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();

	const onChangeSearchParams = (value: string) => {
		handleFilterChange({ title: value, page: 1 });
	};

	const onChangeSkills = (skills: number[] | undefined) => {
		handleFilterChange({ skills, page: 1 });
	};

	const onChangeSpecialization = (specialization: number | number[]) => {
		handleFilterChange({
			specialization: Array.isArray(specialization) ? specialization : [specialization],
			page: 1,
		});
	};

	const onChangeResources = (resources: string[] | undefined) => {
		handleFilterChange({ resources, page: 1 });
	};

	const onChangePage = (page: number) => {
		handleFilterChange({ page });
	};

	const onChangeStatus = (status: FilterFromUser['status']) => {
		handleFilterChange({ status, page: 1 });
	};

	return {
		filter,
		onChangeSearchParams,
		onChangeSkills,
		onChangeResources,
		onChangeSpecialization,
		onChangePage,
		resetFilters,
		onChangeStatus,
	};
};
