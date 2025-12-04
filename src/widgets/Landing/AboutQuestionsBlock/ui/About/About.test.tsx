import { screen, within } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import { About } from './About';
import { AboutSkeleton } from './About.skeleton';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(() => ({
		isMobileS: false,
	})),
}));

describe('About', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render About', () => {
		renderComponent(<About />);
		const container = screen.getByTestId('About');
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass('about');
	});

	test('should render heading on desktop', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false });
		renderComponent(<About />);
		const desktopTextElement = document.querySelector('.about h3');

		expect(desktopTextElement).toHaveClass('head3');
	});

	test('should render paragraph on mobile', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });
		renderComponent(<About />);
		const mobileTextElement = document.querySelector('.about p');

		expect(mobileTextElement).toHaveClass('body5-accent');
	});

	test('should render paragraph on mobile', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });
		renderComponent(<About />);
		const mobileTextElement = document.querySelector('.about p');

		expect(mobileTextElement).toHaveClass('body5-accent');
	});

	test('should render title skeleton with correct height for desktop', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false });
		renderComponent(<AboutSkeleton />);

		const titleSkeleton = screen.getByTestId('AboutSkeleton_Text');
		expect(titleSkeleton).toHaveStyle('height: 39.1px');
	});

	test('should render title skeleton with correct height for mobile', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });
		renderComponent(<AboutSkeleton />);

		const titleSkeleton = screen.getByTestId('AboutSkeleton_Text');
		expect(titleSkeleton).toHaveStyle('height: 24px');
	});

	test('should render correct title content', () => {
		renderComponent(<About />);
		const container = screen.getByTestId('About');
		const titleElement = within(container).getByText(new RegExp(Landing.QUESTIONS_TITLE, 'i'));

		expect(titleElement).toHaveClass('title');
		expect(titleElement).toHaveTextContent(Landing.QUESTIONS_TITLE);
	});

	test('should render correct description content', () => {
		renderComponent(<About />);
		const container = screen.getByTestId('About');
		const descriptionElement = within(container).getByText(
			new RegExp(Landing.QUESTIONS_DESCRIPTION, 'i'),
		);

		expect(descriptionElement).toHaveClass('description');
		expect(descriptionElement).toHaveTextContent(Landing.QUESTIONS_DESCRIPTION);
	});
});
