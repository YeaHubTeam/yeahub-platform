import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';

import styles from './About.module.css';

export const About = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	return (
		<div className={styles.about} data-testid="About">
			<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
				{t(Landing.QUESTIONS_TITLE)}
			</Text>
			<Text variant="body3" className={styles.description}>
				{t(Landing.QUESTIONS_DESCRIPTION)}
			</Text>
		</div>
	);
};
