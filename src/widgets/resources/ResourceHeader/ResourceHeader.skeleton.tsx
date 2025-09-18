import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ResourceAdditionalInfoDrawerSkeleton } from '../ResourceAdditionalInfoDrawer/ui/ResourceAdditionalInfoDrawer.skeleton';

export const ResourceHeaderSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex gap="20" direction={isMobile ? 'column' : 'row'} justify="between">
			<Flex direction="column" gap="10">
				<TextSkeleton variant="body3-strong" width={150} />
				<TextSkeleton variant="body2-strong" width={150} />
			</Flex>
			{(isMobile || isTablet) && <ResourceAdditionalInfoDrawerSkeleton />}
		</Flex>
	);
};
