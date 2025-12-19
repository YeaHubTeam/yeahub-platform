import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';

import styles from './BlockDescription.module.css';

export const BlockDescription = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();
	const variant = isMobile ? 'body3-accent' : 'body6';
	const className = classNames(styles.description, {
		[styles.mobile]: isMobile,
		[styles.desktop]: !isMobile,
	});

	return (
		<>
			<Text className={className} variant={variant} color="white-900">
				{t(Landing.BANNER_DESCRIPTION)}
			</Text>
		</>
	);
};
