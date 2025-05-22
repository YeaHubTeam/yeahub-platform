import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Text } from '@/shared/ui/Text';

import styles from './BlockTitle.module.css';

export const BlockTitle = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	return (
		<Text
			variant={isMobile ? 'body5-accent' : 'head3'}
			className={classNames(styles.title, styles.desktop)}
		>
			{t(Landing.BANNER_TITLE)}
		</Text>
	);
};
