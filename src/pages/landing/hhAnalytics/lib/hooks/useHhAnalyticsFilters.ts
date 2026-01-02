import { useQueryFilterParams } from '@/shared/libs';

import type { HhAnalyticsFiltersParams, HhAnalyticsMode } from '../../model/types/filters';
import { useGetHhAnalyticsFilterParams } from '../hooks/useGetHhAnalyticsFilterParams';

export const useHhAnalyticsFilters = (initialParams: HhAnalyticsFiltersParams) => {
	const currentParams = useGetHhAnalyticsFilterParams(initialParams);

	const { filters, onFilterChange } = useQueryFilterParams<HhAnalyticsFiltersParams>(
		initialParams,
		currentParams,
	);

	const onChangePage = (page: HhAnalyticsFiltersParams['page']) => {
		onFilterChange({
			page,
			specialization: filters.specialization,
			mode: filters.mode,
		});
	};

	const onChangeSpecialization = (specialization: HhAnalyticsFiltersParams['specialization']) => {
		onFilterChange({
			specialization,
			page: 1,
			mode: filters.mode,
		});
	};

	const onChangeMode = (mode: HhAnalyticsMode) => {
		onFilterChange({
			mode,
			page: 1,
			specialization: filters.specialization,
		});
	};

	return {
		filters,
		onChangePage,
		onChangeSpecialization,
		onChangeMode,
	};
};
