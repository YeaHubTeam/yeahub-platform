import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Analytics, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetHhTopBySpecQuery } from '@/entities/hh';
import type { HhAnalyticsItem } from '@/entities/hh';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { HhAnalyticsFiltersWrapper } from '@/features/hhAnalyticsFilters';

import { HhAnalyticsTableWrapper } from '@/widgets/HhAnalyticsTable';

const PAGE_LIMIT = 10;

export const HhAnalyticsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const [searchParams] = useSearchParams();

	const page = Number(searchParams.get('page')) || 1;
	const mode = (searchParams.get('mode') as 'skills' | 'keywords') || 'skills';
	const specializationId = Number(searchParams.get('specialization') || DEFAULT_SPECIALIZATION_ID);
	const { data, isLoading, isError, error } = useGetHhTopBySpecQuery(specializationId);

	const activeList = useMemo(() => {
		if (!data) return [];
		return mode === 'skills' ? data?.skills || [] : data?.keywords || [];
	}, [data, mode]);

	const start = (page - 1) * PAGE_LIMIT;
	const end = start + PAGE_LIMIT;

	const rows = useMemo(() => {
		return activeList.slice(start, end).map((item: HhAnalyticsItem, idx: number) => {
			const absolutelyIndex = idx + start;
			return {
				id: item.title,
				index: absolutelyIndex + 1,
				count: item.count,
				title: item.title,
				isTop20: absolutelyIndex < 20,
			};
		});
	}, [activeList, start, end]);

	console.log({
		data,
		isLoading,
		isError,
		error,
	});

	const total = activeList.length;

	return (
		<Card>
			<Flex direction="column" gap="24">
				<Text variant="body6" isMainTitle>
					{mode === 'skills'
						? t(Analytics.HH_ANALYTICS_TITLE_SKILLS)
						: t(Analytics.HH_ANALYTICS_TITLE_KEYWORDS)}
				</Text>

				<HhAnalyticsFiltersWrapper initialSpecializationId={specializationId} initialMode={mode} />

				<HhAnalyticsTableWrapper
					initialRows={rows}
					initialMode={mode}
					initialTotal={total}
					initialPage={page}
					pageLimit={PAGE_LIMIT}
				/>
			</Flex>
		</Card>
	);
};
