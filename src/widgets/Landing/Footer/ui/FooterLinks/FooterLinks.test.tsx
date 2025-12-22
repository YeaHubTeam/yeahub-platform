import { screen } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { useScreenSize, renderComponent } from '@/shared/libs';

import { RESOURCES_LINKS } from '../../model/constants/footerConstants';

import { FooterLinks } from './FooterLinks';

jest.mock('@/shared/libs/dom', () => ({
	useScreenSize: jest.fn(() => ({ isSmallScreen: false })),
}));

describe('FooterLinks', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should wrap all links inside Flex with correct class', () => {
		renderComponent(<FooterLinks />);

		const flexWrapper = screen.getByTestId('FooterLinks');
		expect(flexWrapper).toBeInTheDocument();
		expect(flexWrapper).toHaveClass('footer-resources-links');
	});

	test('should render docs and socialMedia links inside NavLink with correct href', () => {
		renderComponent(<FooterLinks />);

		const navDocs = screen.getByTestId('Footer_NavDocs');
		expect(navDocs).toBeInTheDocument();
		expect(navDocs).toHaveAttribute('href', '/docs');

		const navMedia = screen.getByTestId('Footer_NavMedia');
		expect(navMedia).toBeInTheDocument();
		expect(navMedia).toHaveAttribute('href', '/socialMedia');
	});

	test('should render docs and socialMedia links with correct default variant, color, className and translation', () => {
		renderComponent(<FooterLinks />);

		const docsLink = screen.getByTestId('Footer_Docs');
		expect(docsLink).toBeInTheDocument();
		expect(docsLink).toHaveClass('body2-accent');
		expect(docsLink).toHaveClass('docs-link');
		expect(docsLink).toHaveStyle({ color: 'black-400' });
		expect(docsLink).toHaveTextContent(Landing.FOOTER_DOCS);

		const mediaLink = screen.getByTestId('Footer_Media');
		expect(mediaLink).toBeInTheDocument();
		expect(mediaLink).toHaveClass('body2-accent');
		expect(mediaLink).toHaveClass('docs-link');
		expect(mediaLink).toHaveStyle({ color: 'black-400' });
		expect(mediaLink).toHaveTextContent(Landing.FOOTER_MEDIA);
	});

	test('should apply body2 variant on small screens', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isSmallScreen: true });

		renderComponent(<FooterLinks />);

		const docsLink = screen.getByTestId('Footer_Docs');
		expect(docsLink).toHaveClass('body2');

		const mediaLink = screen.getByTestId('Footer_Media');
		expect(mediaLink).toHaveClass('body2');
	});

	test('should render all resource links with correct classes, translation and icon color', () => {
		renderComponent(<FooterLinks />);

		RESOURCES_LINKS.forEach(({ url, label, className, color }) => {
			const link = screen.getByLabelText(`${label} ${Landing.FOOTER_LINKS_LINK_ARIA_LABEL}`);
			expect(link).toBeInTheDocument();
			expect(link).toHaveClass(className);
			expect(link).toHaveAttribute('href', url);
			expect(link).toHaveAttribute(
				'aria-label',
				`${label} ${Landing.FOOTER_LINKS_LINK_ARIA_LABEL}`,
			);

			const icon = screen.getByTestId(`icon-${label}`);
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute('color', `var(--color-${color})`);
		});
	});
});
