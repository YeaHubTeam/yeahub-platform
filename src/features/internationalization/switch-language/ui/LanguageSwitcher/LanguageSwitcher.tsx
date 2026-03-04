import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Switch } from '@/shared/ui/Switch';

import { Languages } from '../../model/types/changingLanguage';

import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = memo(() => {
	const { i18n } = useTranslation();

	const onChangeLanguage = () => {
		i18n.changeLanguage(i18n.language === Languages.RU ? Languages.EN : Languages.RU);
	};

	return (
		<Switch
			className={styles.switch}
			switchClassName={styles.wrapper}
			pinClassName={styles.pin}
			checked={i18n.language === Languages.EN}
			onChange={onChangeLanguage}
		/>
	);
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
