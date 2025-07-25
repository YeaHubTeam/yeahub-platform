import { useTranslation } from 'react-i18next';

import Alarm from '@/shared/assets/images/alarm.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Media } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './AlarmFact.module.css';

export const AlarmFact = () => {
	const { t } = useTranslation(i18Namespace.media);
	const { isLargeScreen, isLaptop } = useScreenSize();

	return (
		<Flex className={styles['wrapper']} gap="20" align="center">
			<img src={Alarm} className={styles['alarm']} alt="" />
			<Text variant={isLargeScreen || isLaptop ? 'body6' : 'body5-accent'} color="white-900">
				{t(Media.MEDIA_FACT)}
			</Text>
		</Flex>
	);
};
