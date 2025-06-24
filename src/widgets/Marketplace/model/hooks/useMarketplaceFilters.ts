import { useQueryFilter } from '@/shared/hooks';

import { MarketplaceFilterStatus } from '@/entities/resource';

export const useMarketplaceFilters = () => {
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();

	const onChangeSearchParams = (value: string) => {
		handleFilterChange({ title: value });
	};

	const onChangeSkills = (skills: number[] | undefined) => {
		handleFilterChange({ skills });
	};

	const onChangeSpecialization = (specialization: number | number[]) => {
		handleFilterChange({
			specialization: Array.isArray(specialization) ? specialization : [specialization],
			page: 1,
		});
	};

	const onChangeResources = (resources: number[] | undefined) => {
		handleFilterChange({ resources });
	};

	const onChangeStatus = (status: MarketplaceFilterStatus) => {
		handleFilterChange({ status });
	};

	return {
		filter,
		onChangeSearchParams,
		onChangeSkills,
		onChangeResources,
		onChangeSpecialization,
		onChangeStatus,
		resetFilters,
	};
};
