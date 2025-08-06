import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import {
	OurMediaBanner,
	AlarmFactBanner,
	GurusBlock,
	TelegramChannels,
} from '@/widgets/Landing/Media';

const MediaPage = () => {
	const { isTablet, isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap={isMobile ? '20' : isTablet ? '40' : '60'}>
			<OurMediaBanner />
			<GurusBlock />
			<AlarmFactBanner />
			<TelegramChannels />
		</Flex>
	);
};

export default MediaPage;
