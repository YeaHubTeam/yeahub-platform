import { screen } from '@testing-library/react';
import { useMatch } from 'react-router-dom';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { SkeletonGenerator } from './SkeletonGenerator';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useMatch: jest.fn(),
}));

describe('SkeletonGenerator', () => {
	const mockUseMatch = useMatch as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render LandingPageSkeleton when isLandingPage is true', () => {
		mockUseMatch.mockImplementation((route) => (route === '/' ? true : null));

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('LandingPageSkeleton')).toBeInTheDocument();
	});

	test('should render CreatePublicQuizPageSkeleton when isQuizPage is true', () => {
		mockUseMatch.mockImplementation((route) => (route === '/quiz' ? true : null));

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('CreatePublicQuizPageSkeleton')).toBeInTheDocument();
	});

	test('should render PublicQuizPageSkeleton when isNewQuizPage is true', () => {
		mockUseMatch.mockImplementation((route) => (route === '/quiz/new' ? true : null));

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('PublicQuizPageSkeleton')).toBeInTheDocument();
	});

	test('should render PublicQuizResultPageSkeleton when isQuizResultPage is true', () => {
		mockUseMatch.mockImplementation((route) => (route === '/quiz/result' ? true : null));

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('PublicQuizResultPageSkeleton')).toBeInTheDocument();
	});

	test('should render PublicQuestionsPageSkeleton when isQuestionsPage is true', () => {
		mockUseMatch.mockImplementation((route) => (route === '/questions' ? true : null));

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('PublicQuestionsPageSkeleton')).toBeInTheDocument();
	});

	test('should render PublicQuestionPageSkeleton when isQuestionDetailPage is true', () => {
		mockUseMatch.mockImplementation((route) => (route === '/questions/:questionId' ? true : null));

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('PublicQuestionPageSkeleton')).toBeInTheDocument();
	});

	test('should render Loader when no match is found', () => {
		mockUseMatch.mockReturnValue(null);

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});
});
