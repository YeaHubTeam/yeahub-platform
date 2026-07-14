import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const SpecializationAdditionalInfoSkeleton = () => {
	return (
		<div style={{ marginLeft: 'auto' }}>
			<CardSkeleton>
				<Flex direction="column" gap="24">
					<BaseFilterSectionSkeleton length={1} />
					<BaseFilterSectionSkeleton length={1} />
					<Flex gap="4">
						<TextSkeleton variant="body2-accent" width="100px" />
						<TextSkeleton variant="body2-accent" width="100px" />
					</Flex>
				</Flex>
			</CardSkeleton>
		</div>
	);
};
