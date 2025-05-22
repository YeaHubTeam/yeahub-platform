import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Text } from '@/shared/ui/Text';

import styles from './About.module.css';

export const About = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	return (
		<div className={styles.about}>
			<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
				{t(Landing.QUESTIONS_TITLE)}
			</Text>
			<Text variant={'body3'} className={styles.description}>
				{t(Landing.QUESTIONS_DESCRIPTION)}
			</Text>
		</div>
	);
};
