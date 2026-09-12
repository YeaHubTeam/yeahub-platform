import { TablePagination } from '@/shared/ui/TablePagination';

import { useHhAnalyticsFilters } from '@/features/hhAnalyticsFilters';

import { HhAnalyticsRow, HhAnalyticsTable } from '../HhAnalyticsTable/HhAnalyticsTable';

interface HhAnalyticsTableWrapperProps {
	initialRows: HhAnalyticsRow[];
	initialMode: 'skills' | 'keywords';
	initialTotal: number;
	initialPage: number;
	pageLimit: number;
}

export const HhAnalyticsTableWrapper = ({
	initialRows,
	initialMode,
	initialTotal,
	initialPage,
	pageLimit,
}: HhAnalyticsTableWrapperProps) => {
	console.log('HhAnalyticsTableWrapper data:', {
		initialRows,
		initialMode,
		initialTotal,
		initialPage,
		pageLimit,
	});

	const { filters, onChangePage } = useHhAnalyticsFilters({
		mode: initialMode,
		page: initialPage,
	});

	return (
		<>
			<HhAnalyticsTable rows={initialRows} mode={filters.mode || initialMode} />
			<TablePagination
				total={initialTotal}
				page={filters.page || initialPage}
				onChangePage={onChangePage}
				limit={pageLimit}
			/>
		</>
	);
};
