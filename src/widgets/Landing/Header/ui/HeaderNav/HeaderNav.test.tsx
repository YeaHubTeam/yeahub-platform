import { screen } from '@testing-library/react';

import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { HeaderNav } from './HeaderNav';

jest.mock('@/shared/hooks', () => ({
	useScreenSize: jest.fn(() => ({ isLargeScreen: true })),
}));

describe('HeaderNav', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render nav with correct aria-label', () => {
		renderComponent(<HeaderNav />);

		const navWrapper = screen.getByTestId('HeaderNav');
		expect(navWrapper).toBeInTheDocument();
		expect(navWrapper).toHaveAttribute('aria-label', Landing.HEADER_NAV_ARIA_LABEL);
	});

	test('should render desktop navigation on large screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: true });

		renderComponent(<HeaderNav />);

		expect(screen.getByTestId('HeaderNavDesktop_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('PopoverButton')).not.toBeInTheDocument();
	});

	test('should render mobile navigation on small screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: false });

		renderComponent(<HeaderNav />);

		expect(screen.queryByTestId('HeaderNavDesktop_Wrapper')).not.toBeInTheDocument();
		expect(screen.getByTestId('PopoverButton')).toBeInTheDocument();
	});
});
