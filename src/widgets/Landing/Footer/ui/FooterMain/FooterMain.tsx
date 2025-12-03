import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './FooterMain.module.css';

export const FooterMain = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile, isMobileS, isSmallScreen } = useScreenSize();

	return (
		<Flex dataTestId="FooterMain" className={styles['footer-main']}>
			<Icon
				dataTestId="FooterMain_Logo"
				className={styles['footer-logo']}
				icon={'logoText'}
				aria-label={t(Landing.APP_LOGO_ARIA_LABEL)}
				color="white-900"
			/>
			<Text
				dataTestId="FooterMain_Title"
				className={styles['footer-title']}
				variant={isMobileS ? 'body2' : isMobile ? 'body3' : 'body3-accent'}
				color="white-900"
			>
				{t(Landing.FOOTER_TITLE)}
			</Text>
			<Text
				dataTestId="FooterMain_Description"
				className={styles['footer-description']}
				variant={isSmallScreen ? 'body1' : 'body1-accent'}
				color="black-400"
			>
				{t(Landing.FOOTER_DESCRIPTION)}
			</Text>
		</Flex>
	);
};
