import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { OurMedia } from '@/widgets/Landing/Media';
import { GurusList } from '@/widgets/Landing/Media';
import { AlarmFact } from '@/widgets/Landing/Media';
import { TelegramChannels } from '@/widgets/Landing/Media';

const MediaPage = () => {
	const { isTablet, isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap={isMobile ? '20' : isTablet ? '40' : '60'}>
			<OurMedia />
			<GurusList />
			<AlarmFact />
			<TelegramChannels />
		</Flex>
	);
};

export default MediaPage;
