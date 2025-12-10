import { useTranslation } from 'react-i18next';

import Alarm from '@/shared/assets/images/alarm.png';
import { i18Namespace, Media } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Banner } from '@/shared/ui/Banner';
import { Flex } from '@/shared/ui/Flex';

import { GurusBlock, OurMediaBanner, TelegramChannels } from '@/widgets/Landing/Media';

const MediaPage = () => {
	const { isTablet, isMobile } = useScreenSize();
	const { t } = useTranslation(i18Namespace.media);

	return (
		<Flex direction="column" gap={isMobile ? '20' : isTablet ? '40' : '60'}>
			<OurMediaBanner />
			<GurusBlock />
			<Banner img={Alarm} alt="Alarm" title={t(Media.MEDIA_FACT)} color="violet" />
			<TelegramChannels />
		</Flex>
	);
};

export default MediaPage;
