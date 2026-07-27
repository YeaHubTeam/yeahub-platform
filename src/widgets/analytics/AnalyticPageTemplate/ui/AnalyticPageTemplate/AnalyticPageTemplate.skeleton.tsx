import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
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
	rowsCount = 1,
	withChips = false,
	withImage = false,
	withSkillFilter = false,
}: AnalyticPageTemplateSkeletonProps) => {
	const { isMobile } = useScreenSize();

	return (
		<CardSkeleton>
			<Flex className={styles.header} justify="between">
				<TextSkeleton variant={isMobile ? 'body5-accent' : 'body6'} width={400} />
				<IconSkeleton size={20} borderRadius="50%" />
			</Flex>
			<Flex
				gap="14"
				wrap="wrap"
				className={styles['dropdown-container']}
				direction={isMobile ? 'column' : 'row'}
			>
				<SpecializationSelectSkeleton />
				{withSkillFilter && <SkillSelectSkeleton />}
			</Flex>
			{isMobile ? (
				<AnalyticPageTemplateMobileListSkeleton
					withChips={withChips}
					withImage={withImage}
					rowsCount={rowsCount}
				/>
			) : (
				<TableSkeleton hasAction={false} hasSelectors={false} columnCount={columnCount} />
			)}

			<TablePaginationSkeleton />
		</CardSkeleton>
	);
};
