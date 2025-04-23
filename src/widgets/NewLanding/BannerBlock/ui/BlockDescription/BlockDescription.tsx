import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Text } from '@/shared/ui/Text';

import styles from './BlockDescription.module.css';

export const BlockDescription = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<>
			<Text className={cn(styles.description, styles.desktop)} variant="body6" color="white-900">
				{/*нет такого варианта текста*/}
				{t(Landing.BANNER_DESCRIPTION)}
			</Text>
			<Text
				className={cn(styles.description, styles.mobile)}
				variant="body3-accent"
				color="white-900"
			>
				{/* нет такого варианта текста */}
				{t(Landing.BANNER_DESCRIPTION)}
			</Text>
		</>
	);
};
