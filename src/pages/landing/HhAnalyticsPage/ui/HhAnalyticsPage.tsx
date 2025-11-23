import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Loader } from '@/shared/ui/Loader';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';

import { useGetHhTopBySpecQuery } from '@/entities/hhAnalytics';
import { SpecializationSelect } from '@/entities/specialization';

import {
	HhAnalyticsMode,
	HhAnalyticsRow,
	HhAnalyticsTable,
} from '@/widgets/analytics/HhAnalyticsTable';

import styles from './HhAnalyticsPage.module.css';

const PAGE_LIMIT = 20;
const DEFAULT_SPEC_ID = 11;

const HhAnalyticsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	const { isMobile } = useScreenSize();

	const [mode, setMode] = useState<HhAnalyticsMode>('skills');
	const [page, setPage] = useState(1);
	const [specializationId, setSpecializationId] = useState(DEFAULT_SPEC_ID);

	const { data, isLoading } = useGetHhTopBySpecQuery(specializationId);

	const handleChangeMode = (newMode: HhAnalyticsMode) => {
		setMode(newMode);
		setPage(1);
	};
	const handleChangePage = (newPage: number) => {
		setPage(newPage);
	};
	const handleChangeSpecialization = (newSpecializationId: number | number[]) => {
		const value = Array.isArray(newSpecializationId) ? newSpecializationId[0] : newSpecializationId;

		setSpecializationId(value);
		setPage(1);
	};

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
		return <Loader />;
	}

	return (
		<Card>
			<Flex direction="column" gap="24">
				<Text variant={'body6'}>
					{mode === 'skills'
						? t(Analytics.HH_ANALYTICS_TITLE_SKILLS)
						: t(Analytics.HH_ANALYTICS_TITLE_KEYWORDS)}
				</Text>

				<Flex direction={'column'} gap="20">
					<Flex direction={isMobile ? 'column' : 'row'} gap="24" justify="between">
						<SpecializationSelect
							prefix={' '}
							value={specializationId}
							onChange={handleChangeSpecialization}
						/>

						<Flex direction={isMobile ? 'column' : 'row'} align="center" gap="14">
							<Button
								size={'large'}
								variant={mode === 'skills' ? 'secondary' : 'outline'}
								onClick={() => handleChangeMode('skills')}
								fullWidth={isMobile}
								className={styles['mode-button']}
							>
								{t(Analytics.HH_ANALYTICS_TAB_SKILLS)}
							</Button>
							<Button
								size={'large'}
								variant={mode === 'keywords' ? 'secondary' : 'outline'}
								onClick={() => handleChangeMode('keywords')}
								fullWidth={isMobile}
								className={styles['mode-button']}
							>
								{t(Analytics.HH_ANALYTICS_TAB_KEYWORDS)}
							</Button>
						</Flex>
					</Flex>

					<Flex direction="column">
						<HhAnalyticsTable rows={rows} mode={mode} />

						<TablePagination
							total={total}
							page={page}
							onChangePage={handleChangePage}
							limit={PAGE_LIMIT}
						/>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};
export default HhAnalyticsPage;
