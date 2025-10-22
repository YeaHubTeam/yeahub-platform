import { useScreenSize } from '@/shared/hooks';
import { BannerSkeleton } from '@/shared/ui/Banner';
import { Flex } from '@/shared/ui/Flex';

import {
	OurMediaBannerSkeleton,
	GurusBlockSkeleton,
	TelegramChannelsSkeleton,
} from '@/widgets/Landing/Media';

export const MediaPageSkeleton = () => {
	const { isTablet, isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap={isMobile ? '20' : isTablet ? '40' : '60'}>
			<OurMediaBannerSkeleton />
			<GurusBlockSkeleton />
			<BannerSkeleton />
			<TelegramChannelsSkeleton />
		</Flex>
	);
};
