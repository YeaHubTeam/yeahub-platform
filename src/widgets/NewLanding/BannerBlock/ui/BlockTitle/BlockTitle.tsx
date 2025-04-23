import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Text } from '@/shared/ui/Text';

import styles from './BlockTitle.module.css';

export const BlockTitle = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<>
			<Text variant="head2" className={cn(styles.title, styles.desktop)}>
				{t(Landing.BANNER_TITLE)}
			</Text>
			{/*Нет такого варианта текста*/}

			<Text variant="head3" className={cn(styles.title, styles.tablet)}>
				{t(Landing.BANNER_TITLE)}
			</Text>
			{/*Нет такого варианта текста*/}
			<Text variant="head3" className={cn(styles.title, styles.mobile)}>
				{t(Landing.BANNER_TITLE)}
			</Text>
		</>
	);
};
