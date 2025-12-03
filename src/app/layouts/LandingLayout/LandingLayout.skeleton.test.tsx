import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { LandingLayoutSkeleton } from './LandingLayout.skeleton';

describe('LandingLayoutSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		renderComponent(<LandingLayoutSkeleton />);
	});

	test('renders main Flex wrapper', () => {
		const wrapper = screen.getByTestId('LandingLayoutSkeleton_Wrapper');
		expect(wrapper).toBeInTheDocument();
	});

	test('renders HeaderSkeleton', () => {
		const wrapper = screen.getByTestId('HeaderSkeleton_Wrapper');
		expect(wrapper).toBeInTheDocument();
	});

	test('renders main element with correct class', () => {
		const main = screen.getByTestId('LandingLayoutSkeleton_Main');
		expect(main).toBeInTheDocument();
		expect(main).toHaveClass('main');
	});

	test('renders main content Flex wrapper', () => {
		const mainContent = screen.getByTestId('LandingLayoutSkeleton_MainContent');
		expect(mainContent).toBeInTheDocument();
		expect(mainContent).toHaveClass('main-content');
	});

	test('renders SkeletonGenerator inside main content', () => {
		const mainContent = screen.getByTestId('LandingLayoutSkeleton_MainContent');
		expect(mainContent).toBeInTheDocument();

		expect(
			mainContent.querySelector(
				`[data-testid="LandingPageSkeleton"], 
         [data-testid="CreatePublicQuizPageSkeleton"], 
         [data-testid="PublicQuizPageSkeleton"], 
         [data-testid="PublicQuizResultPageSkeleton"], 
         [data-testid="PublicQuestionsPageSkeleton"], 
         [data-testid="PublicQuestionPageSkeleton"]`,
			),
		).toBeInTheDocument();
	});

	test('renders FooterSkeleton', () => {
		const footer = screen.getByTestId('FooterSkeleton');
		expect(footer).toBeInTheDocument();
	});
});
