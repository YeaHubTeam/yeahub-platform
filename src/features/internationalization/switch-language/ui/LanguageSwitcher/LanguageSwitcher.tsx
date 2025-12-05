import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config';

import { Languages } from '../../model/types/changingLanguage';

export const LanguageSwitcher = memo(() => {
	const { t, i18n } = useTranslation();

	const onChangeLanguage = () => {
		i18n.changeLanguage(i18n.language === Languages.RU ? Languages.EN : Languages.RU);
	};

	return (
		<button onClick={onChangeLanguage} data-testid="LanguageSwitcher_Button">
			{t(Translation.LANGUAGE)}
		</button>
	);
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
