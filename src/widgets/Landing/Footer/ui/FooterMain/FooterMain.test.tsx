import { screen } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { useScreenSize, renderComponent } from '@/shared/libs';

import { FooterMain } from './FooterMain';

jest.mock('@/shared/libs/dom', () => ({
	useScreenSize: jest.fn(() => ({
		isMobile: false,
		isMobileS: false,
		isSmallScreen: false,
	})),
}));

describe('FooterMain', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render FooterMain wrapper', () => {
		renderComponent(<FooterMain />);

		const component = screen.getByTestId('FooterMain');
		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('footer-main');
	});

	describe('Logo', () => {
		test('should render logo with correct aria-label translation', () => {
			renderComponent(<FooterMain />);

			const logo = screen.getByTestId('FooterMain_Logo');
			expect(logo).toBeInTheDocument();
			expect(logo).toHaveClass('footer-logo');
			expect(logo).toHaveAttribute('aria-label', Landing.APP_LOGO_ARIA_LABEL);
		});
	});

	describe('Title', () => {
		test('should render title with default variant and translation', () => {
			renderComponent(<FooterMain />);

			const title = screen.getByTestId('FooterMain_Title');
			expect(title).toBeInTheDocument();
			expect(title).toHaveClass('footer-title');
			expect(title).toHaveClass('body3-accent');
			expect(title).toHaveTextContent(Landing.FOOTER_TITLE);
		});

		test('should apply body2 variant to title on mobileS', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: true });

			renderComponent(<FooterMain />);

			const title = screen.getByTestId('FooterMain_Title');
			expect(title).toHaveClass('body2');
			expect(title).toHaveTextContent(Landing.FOOTER_TITLE);
		});

		test('should apply body3 variant to title on mobile', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });

			renderComponent(<FooterMain />);

			const title = screen.getByTestId('FooterMain_Title');
			expect(title).toHaveClass('body3');
			expect(title).toHaveTextContent(Landing.FOOTER_TITLE);
		});
	});

	describe('Description', () => {
		test('should render description with default variant and translation', () => {
			renderComponent(<FooterMain />);

			const description = screen.getByTestId('FooterMain_Description');
			expect(description).toBeInTheDocument();
			expect(description).toHaveClass('footer-description');
			expect(description).toHaveClass('body1-accent');
			expect(description).toHaveTextContent(Landing.FOOTER_DESCRIPTION);
		});

		test('should apply body1 variant to description on small screen', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isSmallScreen: true });

			renderComponent(<FooterMain />);

			const description = screen.getByTestId('FooterMain_Description');
			expect(description).toHaveClass('body1');
			expect(description).toHaveTextContent(Landing.FOOTER_DESCRIPTION);
		});
	});
});
