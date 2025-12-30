import { useScreenSize } from '@/shared/libs';
import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const SpecializationsListFieldSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSectionSkeleton length={5} width={150} />
			{!isMobile && <ButtonSkeleton variant="link" width={100} />}
		</Flex>
	);
};
