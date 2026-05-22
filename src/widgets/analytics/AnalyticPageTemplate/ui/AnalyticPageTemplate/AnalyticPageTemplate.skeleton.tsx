import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { CheckboxSkeleton } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';
import { TextSkeleton } from '@/shared/ui/Text';

import { SkillSelectSkeleton } from '@/entities/skill';
import { SpecializationSelectSkeleton } from '@/entities/specialization';

import { AnalyticPageTemplateMobileListSkeleton } from '../AnalyticPageTemplateMobileList/AnalyticPageTemplateMobileList.skeleton';

import styles from './AnalyticPageTemplate.module.css';

interface AnalyticPageTemplateSkeletonProps {
	rowsCount?: number;
	fieldsCount?: number;
	withChips?: boolean;
	withImage?: boolean;
	withSkillFilter?: boolean;
}

export const AnalyticPageTemplateSkeleton = ({
	fieldsCount = 1,
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
					fieldsCount={fieldsCount}
				/>
			) : (
				<table>
					<thead>
						<tr>
							<td style={{ width: '50px' }}>
								<CheckboxSkeleton />
							</td>
							<td>
								<TextSkeleton variant="body5" width="30vw" />
							</td>
							{Array.from({ length: fieldsCount }).map((_, idx) => (
								<td key={idx} style={{ width: '120px' }}>
									<TextSkeleton variant="body5" width="120px" />
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 10 }).map((_, idx) => (
							<tr key={idx}>
								<td>
									<CheckboxSkeleton />
								</td>
								<td>
									<Flex direction="column" gap="4">
										<TextSkeleton variant="body3-accent" width="30vw" />
										{withChips && (
											<Flex>
												<StatusChipSkeleton />
											</Flex>
										)}
									</Flex>
								</td>
								{Array.from({ length: fieldsCount }).map((_, idx) => (
									<td key={idx} style={{ width: '120px' }}>
										<TextSkeleton variant="body3-accent" width="120px" />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}

			<TablePaginationSkeleton />
		</Card>
	);
};
