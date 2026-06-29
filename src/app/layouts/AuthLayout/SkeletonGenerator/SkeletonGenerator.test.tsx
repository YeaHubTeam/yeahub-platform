import { screen } from '@testing-library/react';
import { useMatch } from 'react-router-dom';

import { renderComponent } from '@/shared/libs';

import { SkeletonGenerator } from './SkeletonGenerator';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useMatch: jest.fn(),
}));

describe('AuthLayout SkeletonGenerator', () => {
	const mockUseMatch = useMatch as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render LoginPageSkeleton when isLoginPage is true', () => {
		mockUseMatch.mockImplementation((route) => (route === '/auth/login' ? true : null));

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('LoginPageSkeleton')).toBeInTheDocument();
	});

	test('should render Loader when no route matches', () => {
		mockUseMatch.mockReturnValue(null);

		renderComponent(<SkeletonGenerator />);

		expect(screen.getByTestId('Loader_Wrapper')).toBeInTheDocument();
	});
});
