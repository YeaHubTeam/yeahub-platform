import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TableSkeleton } from '@/shared/ui/Table';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';
import { TextSkeleton } from '@/shared/ui/Text';

import { SkillSelectSkeleton } from '@/entities/skill';
import { SpecializationSelectSkeleton } from '@/entities/specialization';

import { AnalyticPageTemplateMobileListSkeleton } from '../AnalyticPageTemplateMobileList/AnalyticPageTemplateMobileList.skeleton';

import styles from './AnalyticPageTemplate.module.css';

interface AnalyticPageTemplateSkeletonProps {
	rowsCount?: number;
	columnCount?: number;
	withChips?: boolean;
	withImage?: boolean;
	withSkillFilter?: boolean;
}

export const AnalyticPageTemplateSkeleton = ({
	columnCount = 3,
	withChips = false,
	withImage = false,
	withSkillFilter = false,
}: AnalyticPageTemplateSkeletonProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Card>
			<Flex className={styles.header} justify="between">
				<TextSkeleton variant="body6" width={400} />
				<Skeleton width={20} height={20} borderRadius="50%" />
			</Flex>

			<Flex gap="14" wrap="wrap" className={styles['dropdown-container']}>
				<SpecializationSelectSkeleton />
				{withSkillFilter && <SkillSelectSkeleton />}
			</Flex>

			{isMobile ? (
				<AnalyticPageTemplateMobileListSkeleton
					withChips={withChips}
					withImage={withImage}
					columnCount={columnCount}
				/>
			) : (
				<TableSkeleton hasAction={false} hasSelectors={false} columnCount={columnCount} />
			)}

			<TablePaginationSkeleton />
		</Card>
	);
};
