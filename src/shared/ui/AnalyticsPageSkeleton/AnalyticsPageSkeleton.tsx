import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';

import { AnalyticsMobileListSkeleton } from './AnalyticsMobileListSkeleton';
import styles from './AnalyticsPageSkeleton.module.css';
import { AnalyticsTableSkeleton } from './AnalyticsTableSkeleton';

export interface AnalyticsPageSkeletonProps {
	showTitle?: boolean;
	showTooltip?: boolean;
	showFilters?: boolean;
	showSkillFilter?: boolean;
	showPagination?: boolean;
	displayMode?: 'table' | 'mobile';
	tableRowsCount?: number;
	mobileItemsCount?: number;
}

export const AnalyticsPageSkeleton = ({
	showTitle = true,
	showTooltip = true,
	showFilters = true,
	showSkillFilter = true,
	showPagination = true,
	displayMode = 'table',
	tableRowsCount = 10,
	mobileItemsCount = 3,
}: AnalyticsPageSkeletonProps) => {
	const shouldRenderHeader = showTitle || showTooltip;

	return (
		<Card data-testid="AnalyticsPageSkeleton">
			{shouldRenderHeader && (
				<HeaderSection showTitle={showTitle} showTooltip={showTooltip} displayMode={displayMode} />
			)}

			{showFilters && (
				<FiltersSection displayMode={displayMode} showSkillFilter={showSkillFilter} />
			)}

			<ContentSection
				displayMode={displayMode}
				tableRowsCount={tableRowsCount}
				mobileItemsCount={mobileItemsCount}
			/>

			{showPagination && <TablePaginationSkeleton />}
		</Card>
	);
};

interface HeaderSectionProps {
	showTitle: boolean;
	showTooltip: boolean;
	displayMode: 'table' | 'mobile';
}

const HeaderSection = ({ showTitle, showTooltip, displayMode }: HeaderSectionProps) => {
	const isMobile = displayMode === 'mobile';

	return (
		<Flex className={styles.header} justify="between" align="center">
			{showTitle && (
				<Skeleton
					width={isMobile ? 150 : 300}
					height={isMobile ? 20 : 30}
					dataTestId="page-title-skeleton"
				/>
			)}
			{showTooltip && (
				<Skeleton width={20} height={20} borderRadius="50%" dataTestId="tooltip-icon-skeleton" />
			)}
		</Flex>
	);
};

interface FiltersSectionProps {
	displayMode: 'table' | 'mobile';
	showSkillFilter: boolean;
}

const FiltersSection = ({ displayMode, showSkillFilter }: FiltersSectionProps) => {
	const isMobile = displayMode === 'mobile';

	return (
		<Flex
			gap="14"
			wrap="wrap"
			className={styles.filtersContainer}
			direction={isMobile ? 'column' : 'row'}
		>
			<Skeleton
				width={isMobile ? '100%' : 250}
				height={40}
				dataTestId="specialization-filter-skeleton"
			/>
			{showSkillFilter && (
				<Skeleton width={isMobile ? '100%' : 250} height={40} dataTestId="skill-filter-skeleton" />
			)}
		</Flex>
	);
};

interface ContentSectionProps {
	displayMode: 'table' | 'mobile';
	tableRowsCount: number;
	mobileItemsCount: number;
}

const ContentSection = ({ displayMode, tableRowsCount, mobileItemsCount }: ContentSectionProps) => {
	return (
		<div className={styles.content}>
			{displayMode === 'table' ? (
				<AnalyticsTableSkeleton rowsCount={tableRowsCount} />
			) : (
				<AnalyticsMobileListSkeleton itemsCount={mobileItemsCount} />
			)}
		</div>
	);
};
