import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { EnLang, RuLang } from '../../assets/icons';
import { Languages } from '../../model/types/changingLanguage';

import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = memo(() => {
	const { i18n } = useTranslation();

	const onChangeLanguage = () => {
		i18n.changeLanguage(i18n.language === Languages.RU ? Languages.EN : Languages.RU);
	};

	return (
		<>
			<button
				className={styles['button']}
				onClick={onChangeLanguage}
				data-testid="LanguageSwitcher_Button"
			>
				{i18n.language === Languages.RU ? (
					<RuLang className={styles['ru-icon']} />
				) : (
					<EnLang className={styles['en-icon']} />
				)}
			</button>
		</>
	);
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
