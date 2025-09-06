import { screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { FooterLinksSkeleton } from './FooterLinks.skeleton';

jest.mock('@/shared/hooks', () => ({
	useScreenSize: jest.fn(() => ({ isMobileS: false })),
}));

describe('FooterLinksSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: false });
	});

	test('should render Flex wrapper with correct class', () => {
		renderComponent(<FooterLinksSkeleton />);

		const wrapper = screen.getByTestId('FooterLinksSkeleton');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('footer-resources-links');
	});

	test('should render docs TextSkeleton with default width', () => {
		renderComponent(<FooterLinksSkeleton />);

		const textSkeleton = screen.getByTestId('TextSkeleton');
		expect(textSkeleton).toBeInTheDocument();
		expect(textSkeleton).toHaveClass('docs-link');
		expect(textSkeleton).toHaveStyle({ width: '80px' });
		expect(textSkeleton).toHaveStyle({ height: '16.8px' });
	});

	test('should render 5 IconSkeleton components with correct styles', () => {
		renderComponent(<FooterLinksSkeleton />);

		const icons = screen.getAllByTestId('IconSkeleton');
		expect(icons).toHaveLength(5);

		icons.forEach((icon) => {
			expect(icon).toHaveStyle({ width: '24px' });
			expect(icon).toHaveStyle({ height: '24px' });
			expect(icon).toHaveStyle({ borderRadius: '50%' });
		});
	});

	test('should adjust TextSkeleton width for mobile screens', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: true });

		renderComponent(<FooterLinksSkeleton />);

		const textSkeleton = screen.getByTestId('TextSkeleton');
		expect(textSkeleton).toHaveStyle({ width: '70px' });
	});
});
