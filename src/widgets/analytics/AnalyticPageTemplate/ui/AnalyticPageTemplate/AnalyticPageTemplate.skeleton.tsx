import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';
import { TextSkeleton } from '@/shared/ui/Text';

import { AnalyticPageTemplateProps } from './AnalyticPageTemplate';

interface AnalyticPageTemplateSkeletonProps extends AnalyticPageTemplateProps {
	showSkillFilter?: boolean;
}

export const AnalyticPageTemplateSkeleton = ({
	list,
	table,
	filters,
	showSkillFilter = false,
}: AnalyticPageTemplateSkeletonProps) => {
	const { isMobile } = useScreenSize();

	const { page, total, limit } = filters;

	const showPagination = page && total && limit && total > limit;

	return (
		<CardSkeleton>
			<Flex direction="column" gap="24">
				<Flex justify="between" align="center" style={{ marginBottom: '24px' }}>
					<TextSkeleton variant={isMobile ? 'body5-accent' : 'body6'} width="300px" />
					<Skeleton width="20px" height="20px" borderRadius="50%" />
				</Flex>

				<Flex
					gap="14"
					wrap="wrap"
					style={{ marginBottom: '20px' }}
					direction={isMobile ? 'column' : 'row'}
				>
					<Skeleton width="200px" height="40px" borderRadius="8px" />

					{showSkillFilter && <Skeleton width="200px" height="40px" borderRadius="8px" />}
				</Flex>

				{isMobile ? list : table}

				{showPagination && (
					<Flex justify="end">
						<TablePaginationSkeleton />
					</Flex>
				)}
			</Flex>
		</CardSkeleton>
	);
};
