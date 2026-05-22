import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';
import { TextSkeleton } from '@/shared/ui/Text';

interface AnalyticPageTemplateMobileListSkeletonProps {
	withChips?: boolean;
	fieldsCount?: number;
	withImage?: boolean;
	rowsCount?: number;
}

export const AnalyticPageTemplateMobileListSkeleton = ({
	withChips = false,
	fieldsCount = 1,
	withImage = false,
}: AnalyticPageTemplateMobileListSkeletonProps) => {
	return (
		<Flex componentType="ul" direction="column" gap="16">
			{Array.from({ length: 10 }).map((_, index) => (
				<li key={index}>
					<Card>
						<Flex gap="12" direction="column">
							{withChips && <StatusChipSkeleton />}
							{withImage && <ImageWithWrapperSkeleton />}
							<TextSkeleton variant="body3-accent" width="70%" />
							{Array.from({ length: fieldsCount }).map((_, fieldIndex) => (
								<Flex key={fieldIndex} justify="between">
									<TextSkeleton variant="body3-accent" width="25%" />
									<TextSkeleton variant="body3-accent" width="15%" />
								</Flex>
							))}
						</Flex>
					</Card>
				</li>
			))}
		</Flex>
	);
};
