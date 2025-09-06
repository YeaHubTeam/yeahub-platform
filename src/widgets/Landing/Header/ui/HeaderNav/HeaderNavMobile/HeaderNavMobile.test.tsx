import { screen, fireEvent } from '@testing-library/react';

import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { HEADER_NAV_LINKS } from '@/widgets/Landing/Header/model/constants/headerConstants';

import { HeaderNavMobile } from './HeaderNavMobile';

describe('HeaderNavMobile', () => {
	beforeEach(() => {
		renderComponent(<HeaderNavMobile />);
	});

	test('should render popover button with correct class and text', () => {
		const PopoverButton = screen.getByTestId('PopoverButton');
		expect(PopoverButton).toBeInTheDocument();
		expect(PopoverButton).toHaveClass('button');
		expect(PopoverButton).toHaveTextContent(Landing.HEADER_NAV_POPOVER_TITLE);
	});

	test('should toggle aria-expanded on button click', () => {
		const button = screen.getByTestId('PopoverButton');

		expect(button).toHaveAttribute('aria-expanded', 'false');

		fireEvent.click(button);
		expect(button).toHaveAttribute('aria-expanded', 'true');
	});

	test('should render nav links inside popover when opened', () => {
		const button = screen.getByTestId('PopoverButton');
		fireEvent.click(button);

		HEADER_NAV_LINKS.forEach(({ title }) => {
			const linkEl = screen.getByText(title);
			expect(linkEl).toBeInTheDocument();
			expect(linkEl).toHaveTextContent(title);
		});
	});

	test('should render correct number of nav links and close popover on second click', () => {
		const button = screen.getByTestId('PopoverButton');

		fireEvent.click(button);
		expect(screen.getAllByRole('link')).toHaveLength(HEADER_NAV_LINKS.length);

		fireEvent.click(button);
		HEADER_NAV_LINKS.forEach(({ title }) => {
			expect(screen.queryByText(title)).not.toBeInTheDocument();
		});
	});

	test('should toggle arrow icon class when popover opens', () => {
		const button = screen.getByTestId('PopoverButton');
		const arrowIcon = screen.getByTestId('ArrowShortDown_Icon');

		expect(arrowIcon).not.toHaveClass('arrow-open');

		fireEvent.click(button);
		expect(arrowIcon).toHaveClass('arrow-open');
	});
});
