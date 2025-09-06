import { screen } from '@testing-library/react';
import { Suspense } from 'react';
import React from 'react';
import { useMatch } from 'react-router-dom';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { SkeletonGenerator } from '../model/helper/SkeletonGenerator';

import { LandingLayout } from './LandingLayout';
import { LandingLayoutSkeleton } from './LandingLayout.skeleton';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Outlet: jest.fn(() => <div data-testid="Outlet">Mocked Outlet</div>),
	useMatch: jest.fn(),
}));

describe('LandingLayout', () => {
	const mockUseMatch = useMatch as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
		mockUseMatch.mockImplementation((route) => (route === '/' ? true : null));
		renderComponent(<LandingLayout />);
	});

	test('renders main Flex wrapper', () => {
		expect(screen.getByTestId('LandingLayout_Wrapper')).toBeInTheDocument();
	});

	test('renders Header', () => {
		expect(screen.getByTestId('Header')).toBeInTheDocument();
	});

	test('renders AutoScrollToTop wrapper', () => {
		expect(screen.getByTestId('AutoScrollToTop_Wrapper')).toBeInTheDocument();
	});

	test('renders main element with correct class', () => {
		const main = screen.getByTestId('LandingLayout_Main');
		expect(main).toBeInTheDocument();
		expect(main).toHaveClass('main');
	});

	test('renders main content Flex wrapper', () => {
		const mainContent = screen.getByTestId('LandingLayout_MainContent');
		expect(mainContent).toBeInTheDocument();
		expect(mainContent).toHaveClass('main-content');
	});

	test('renders Outlet inside main content', () => {
		expect(screen.getByTestId('Outlet')).toBeInTheDocument();
	});

	test('renders Footer', () => {
		expect(screen.getByTestId('Footer')).toBeInTheDocument();
	});

	test('renders CookiesWarning', () => {
		expect(screen.getByTestId('CookiesWarning')).toBeInTheDocument();
	});
});

describe('LandingLayout Suspense fallbacks', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const LazyComponent = React.lazy(() => new Promise(() => {}));

	test('renders fallback LandingLayoutSkeleton in outer Suspense', async () => {
		renderComponent(
			<Suspense fallback={<LandingLayoutSkeleton />}>
				<LazyComponent />
			</Suspense>,
		);

		expect(screen.getByTestId('LandingLayoutSkeleton_Wrapper')).toBeInTheDocument();
	});

	test('renders fallback SkeletonGenerator in inner Suspense around Outlet', () => {
		renderComponent(
			<Suspense fallback={<SkeletonGenerator />}>
				<LazyComponent />
			</Suspense>,
		);
		expect(screen.getByTestId('LandingPageSkeleton')).toBeInTheDocument();
	});
});
