import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const TaskCategoryFilterListSkeleton = () => {
	return (
		<Flex direction="column" gap="8">
			<BaseFilterSectionSkeleton length={4} width={150} />
			<TextSkeleton variant="body2" width={100} />
		</Flex>
	);
};
