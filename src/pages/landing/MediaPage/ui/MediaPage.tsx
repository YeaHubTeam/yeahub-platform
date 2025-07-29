import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { MediaLinksList } from '@/entities/media';

import { OurMediaBanner } from '@/widgets/Landing/Media';
import { GurusBlock } from '@/widgets/Landing/Media';
import { AlarmFactBanner } from '@/widgets/Landing/Media';

const MediaPage = () => {
	const { isTablet, isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap={isMobile ? '20' : isTablet ? '40' : '60'}>
			<OurMediaBanner />
			<GurusBlock />
			<AlarmFactBanner />
			<MediaLinksList />
		</Flex>
	);
};

export default MediaPage;
