import { useScreenSize } from '@/shared/libs';
import { BannerSkeleton } from '@/shared/ui/Banner';
import { Flex } from '@/shared/ui/Flex';

import { GurusBlockSkeleton } from '../GurusBlock/GurusBlock.skeleton';
import { OurMediaBannerSkeleton } from '../OurMediaBanner/OurMediaBanner.skeleton';
import { TelegramChannelsSkeleton } from '../TelegramChannels/TelegramChannels.skeleton';

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
