import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const ChooseIndustrySkeleton = () => {
	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSectionSkeleton length={4} width={65} />
			<ButtonSkeleton variant="link" width={100} />
		</Flex>
	);
};
