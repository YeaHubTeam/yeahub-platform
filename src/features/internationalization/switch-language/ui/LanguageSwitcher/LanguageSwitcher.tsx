import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Translations } from '@/shared/config/i18n/i18nTranslations';

import { Languages } from '../../model/types/changingLanguage';

/**
 * Component for change language
 */
export const LanguageSwitcher = memo(() => {
	const { t, i18n } = useTranslation();

	const onChangeLanguage = () => {
		i18n.changeLanguage(i18n.language === Languages.RU ? Languages.EN : Languages.RU);
	};

	return (
		<button onClick={onChangeLanguage} data-testid="LanguageSwitcher_Button">
			{t(Translations.LANGUAGE)}
		</button>
	);
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
