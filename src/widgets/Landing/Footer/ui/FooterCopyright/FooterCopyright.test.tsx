import { screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { FooterCopyright } from './FooterCopyright';

jest.mock('@/shared/hooks', () => ({
	useScreenSize: jest.fn(() => ({
		isSmallScreen: false,
	})),
}));

describe('FooterCopyright', () => {
	const copyright = `© ${new Date().getFullYear()} YeaHub`;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render FooterCopyright with default variant and current year', () => {
		renderComponent(<FooterCopyright />);

		const element = screen.getByTestId('FooterCopyright');
		expect(element).toBeInTheDocument();
		expect(element).toHaveClass('body2-accent');
		expect(element).toHaveStyle({ color: 'black-400' });
		expect(element).toHaveTextContent(copyright);
	});

	test('should render FooterCopyright with body2 variant and current year on small screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isSmallScreen: true });

		renderComponent(<FooterCopyright />);

		const element = screen.getByTestId('FooterCopyright');
		expect(element).toBeInTheDocument();
		expect(element).toHaveClass('body2');
		expect(element).toHaveStyle({ color: 'black-400' });
		expect(element).toHaveTextContent(copyright);
	});
});
