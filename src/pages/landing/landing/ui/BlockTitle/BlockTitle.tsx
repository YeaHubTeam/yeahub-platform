import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
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
