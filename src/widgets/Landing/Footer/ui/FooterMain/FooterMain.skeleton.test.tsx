import { screen } from '@testing-library/react';

import { useScreenSize, renderComponent } from '@/shared/libs';

import { FooterMainSkeleton } from './FooterMain.skeleton';

jest.mock('@/shared/libs/dom', () => ({
	useScreenSize: jest.fn(() => ({
		isMobile: false,
		isMobileS: false,
	})),
}));

describe('FooterMainSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render FooterMainSkeleton wrapper', () => {
		console.log(1111, renderComponent);
		renderComponent(<FooterMainSkeleton />);

		const wrapper = screen.getByTestId('FooterMainSkeleton');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('footer-main');
	});

	describe('Logo skeleton', () => {
		test('should render logo skeleton with correct class', () => {
			renderComponent(<FooterMainSkeleton />);

			const logo = screen.getByTestId('FooterMain_Logo');
			expect(logo).toBeInTheDocument();
			expect(logo).toHaveClass('footer-logo');
		});
	});

	describe('Title skeleton', () => {
		test('should render title skeleton with 30% width and correct class', () => {
			renderComponent(<FooterMainSkeleton />);

			const title = screen.getByTestId('FooterMain_Title');
			expect(title).toBeInTheDocument();
			expect(title).toHaveClass('footer-title');
			expect(title).toHaveStyle({ width: '30%' });
		});

		test('should render title skeleton with 70% width on mobileS', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: true });

			renderComponent(<FooterMainSkeleton />);

			const title = screen.getByTestId('FooterMain_Title');
			expect(title).toBeInTheDocument();
			expect(title).toHaveStyle({ width: '70%' });
		});

		test('should render title skeleton with 50% width on mobile', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });

			renderComponent(<FooterMainSkeleton />);

			const title = screen.getByTestId('FooterMain_Title');
			expect(title).toBeInTheDocument();
			expect(title).toHaveStyle({ width: '50%' });
		});
	});

	describe('Description skeleton', () => {
		test('should render description skeleton with default props', () => {
			renderComponent(<FooterMainSkeleton />);

			const description = screen.getByTestId('FooterMain_Description');
			expect(description).toBeInTheDocument();
			expect(description).toHaveClass('footer-description');
			expect(description).toHaveStyle({ width: '96%' });
		});
	});
});
