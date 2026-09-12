// import { useHhFilters } from '../../hooks/useHhFilters';

import { useHhAnalyticsFilters } from '../../model/hooks/useHhAnalyticsFilters';
import { HhAnalyticsFilters } from '../HhAnalyticsFilters/HhAnalyticsFilters';

interface HhAnalyticsFiltersWrapperProps {
	initialSpecializationId?: number;
	initialMode?: 'skills' | 'keywords';
	_initialPage?: number;
}

export const HhAnalyticsFiltersWrapper = ({
	initialSpecializationId,
	initialMode = 'skills',
	_initialPage,
}: HhAnalyticsFiltersWrapperProps) => {
	const { filters, onChangeSpecialization, onChangeMode } = useHhAnalyticsFilters({
		page: 1,
		specialization: initialSpecializationId,
		mode: initialMode,
	});

	return (
		<HhAnalyticsFilters
			specializationId={filters.specialization || initialSpecializationId || 0}
			mode={filters.mode || initialMode}
			onChangeSpecialization={onChangeSpecialization}
			onChangeMode={onChangeMode}
		/>
	);
};
