import { useQueryFilter } from '@/shared/hooks';

import { MarketplaceFilterStatus } from '@/entities/resource';

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

	const onChangeResources = (resources: number[] | undefined) => {
		handleFilterChange({ resources, page: 1 });
	};

	const onChangeStatus = (status: MarketplaceFilterStatus) => {
		handleFilterChange({ status, page: 1 });
	};

	const onChangePage = (page: number) => {
		handleFilterChange({ page });
	};

	return {
		filter,
		onChangeSearchParams,
		onChangeSkills,
		onChangeResources,
		onChangeSpecialization,
		onChangeStatus,
		onChangePage,
		resetFilters,
	};
};
