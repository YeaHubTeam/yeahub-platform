import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';

import { useGetHhTopBySpecQuery } from '@/entities/hh';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { HhAnalyticsFilters, useHhAnalyticsFilters } from '@/features/hhAnalyticsFilters';

import { HhAnalyticsRow, HhAnalyticsTable } from '@/widgets/analytics/HhAnalyticsTable';

import { HhAnalyticsPageSkeleton } from './HhAnalyticsPage.skeleton';

const PAGE_LIMIT = 10;

const HhAnalyticsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	const { filters, onChangePage, onChangeSpecialization, onChangeMode } = useHhAnalyticsFilters({
		page: 1,
		mode: 'skills',
		specialization: DEFAULT_SPECIALIZATION_ID,
	});

	const page = filters.page ?? 1;
	const specializationId = filters.specialization ?? DEFAULT_SPECIALIZATION_ID;

	const mode = filters.mode ?? 'skills';

	const { data, isLoading } = useGetHhTopBySpecQuery(specializationId);

	const activeList = useMemo(() => {
		if (!data) {
			return [];
		}

		return mode === 'skills' ? data.skills : data.keywords;
	}, [data, mode]);

	const rows: HhAnalyticsRow[] = useMemo(() => {
		const start = (page - 1) * PAGE_LIMIT;

		const end = start + PAGE_LIMIT;

		return activeList.slice(start, end).map((item, idx) => {
			const absolutelyIndex = idx + start;

			return {
				id: idx,
				index: absolutelyIndex + 1,
				count: item.count,
				title: item.title,
				isTop20: absolutelyIndex < 20,
			};
		});
	}, [activeList, page]);

	const total = activeList.length;

	if (isLoading) {
		return <HhAnalyticsPageSkeleton />;
	}

	return (
		<Card>
			<Flex direction="column" gap="24">
				<Text variant="body6">
					{mode === 'skills'
						? t(Analytics.HH_ANALYTICS_TITLE_SKILLS)
						: t(Analytics.HH_ANALYTICS_TITLE_KEYWORDS)}
				</Text>

				<HhAnalyticsFilters
					specializationId={specializationId}
					mode={mode}
					onChangeSpecialization={onChangeSpecialization}
					onChangeMode={onChangeMode}
				/>

				<HhAnalyticsTable rows={rows} mode={mode} />

				<TablePagination total={total} page={page} onChangePage={onChangePage} limit={PAGE_LIMIT} />
			</Flex>
		</Card>
	);
};
export default HhAnalyticsPage;
