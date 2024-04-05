import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import { Translations } from '@/shared/config/i18n/i18nTranslations';
import i18n from '@/shared/config/jest/jestI18n';

import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
	beforeEach(() => {
		render(
			<I18nextProvider i18n={i18n}>
				<LanguageSwitcher />
			</I18nextProvider>,
		);
	});

	test('render', () => {
		expect(screen.getByText(Translations.LANGUAGE)).toBeInTheDocument();
	});

	test('changeLanguage', () => {
		const toggleBtn = screen.getByTestId('LanguageSwitcher_Button');
		expect(toggleBtn).toBeInTheDocument();
		expect(i18n.language).toBe('ru');
		fireEvent.click(toggleBtn);
		expect(i18n.language).toBe('en');
		fireEvent.click(toggleBtn);
		expect(i18n.language).toBe('ru');
	});
});
