import { useScreenSize } from '@/shared/hooks';
import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { Flex } from '@/shared/ui/Flex';

import { ResourceCardSkeleton } from '@/entities/resource';

import { ResourceAdditionalInfoSkeleton } from '@/widgets/resources/ResourceAdditionalInfo';
import { ResourceHeaderSkeleton } from '@/widgets/resources/ResourceHeader/ResourceHeader.skeleton';

export const ResourcePageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeaderSkeleton />
			<Flex gap="20">
				<Flex gap="20" direction="column" flex={1}>
					<ResourceHeaderSkeleton />
					<ResourceCardSkeleton />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20">
						<ResourceAdditionalInfoSkeleton />
					</Flex>
				)}
			</Flex>
		</>
	);
};
