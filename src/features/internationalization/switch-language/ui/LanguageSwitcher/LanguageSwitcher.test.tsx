import { fireEvent, screen } from '@testing-library/react';

import { i18nForJest } from '@/shared/config';
import { renderComponent } from '@/shared/libs';

import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
	beforeEach(async () => {
		await i18nForJest.changeLanguage('ru');
		renderComponent(<LanguageSwitcher />);
	});

	test('render', () => {
		const toggle = screen.getByRole('switch');

		expect(toggle).toBeInTheDocument();
		expect(toggle).not.toBeChecked();
	});

	test('changeLanguage', () => {
		const toggle = screen.getByRole('switch');

		expect(i18nForJest.language).toBe('ru');

		fireEvent.click(toggle);
		expect(i18nForJest.language).toBe('en');
		expect(toggle).toBeChecked();

		fireEvent.click(toggle);
		expect(i18nForJest.language).toBe('ru');
		expect(toggle).not.toBeChecked();
	});
});
