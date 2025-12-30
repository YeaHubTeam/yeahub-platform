import { screen } from '@testing-library/react';

import { useScreenSize, renderComponent } from '@/shared/libs';

import { FooterCopyrightSkeleton } from './FooterCopyright.skeleton';

jest.mock('@/shared/libs/dom', () => ({
	useScreenSize: jest.fn(() => ({
		isMobileS: false,
	})),
}));

describe('FooterCopyrightSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render TextSkeleton', () => {
		renderComponent(<FooterCopyrightSkeleton />);

		const wrapper = screen.getByTestId('FooterCopyrightSkeleton');
		expect(wrapper).toBeInTheDocument();
	});

	describe('TextSkeleton', () => {
		test('should render TextSkeleton with default width and variant', () => {
			renderComponent(<FooterCopyrightSkeleton />);

			const textSkeleton = screen.getByTestId('FooterCopyrightSkeleton');
			expect(textSkeleton).toBeInTheDocument();
			expect(textSkeleton).toHaveStyle({ width: '100px' });
			expect(textSkeleton).toHaveStyle({ height: '16.8px' });
		});

		test('should render TextSkeleton with correct styles on mobileS', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: true });

			renderComponent(<FooterCopyrightSkeleton />);

			const textSkeleton = screen.getByTestId('FooterCopyrightSkeleton');
			expect(textSkeleton).toBeInTheDocument();
			expect(textSkeleton).toHaveStyle({ width: '80px' });
			expect(textSkeleton).toHaveStyle({ height: '16.8px' });
		});
	});
});
