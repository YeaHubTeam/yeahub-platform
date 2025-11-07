import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import headphones from '@/widgets/Landing/Avos/model/assets/headphones.jpg';

import styles from './AvosListen.module.css';

export const AvosListen = () => {
	const { isSmallScreen, isMobileS } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Card withOutsideShadow className={styles.listen}>
			<Flex gap="10" justify="between" direction={isSmallScreen ? 'column' : 'row'}>
				<Flex align="center" gap="20" direction={isMobileS ? 'column' : 'row'}>
					<img src={headphones} alt="" className={styles.headphones} />
					<Text variant={isMobileS ? 'body3-accent' : 'body5-accent'} className={styles.text}>
						{t(Landing.AVOS_LISTEN_PRACTICE)}
					</Text>
				</Flex>
				<Button size="large" className={styles.button}>
					{t(Landing.AVOS_LISTEN_JOIN)}
				</Button>
			</Flex>
		</Card>
	);
};
