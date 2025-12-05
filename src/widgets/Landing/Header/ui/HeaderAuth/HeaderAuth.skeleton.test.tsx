import { screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import { HeaderAuthSkeleton } from './HeaderAuth.skeleton';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(() => ({ isLargeScreen: true })),
}));

describe('HeaderAuthSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render HeaderAuthDesktopSkeleton on large screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: true });

		renderComponent(<HeaderAuthSkeleton />);

		expect(screen.getByTestId('HeaderAuthDesktopSkeleton_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderAuthMobileSkeleton')).not.toBeInTheDocument();
	});

	test('should render HeaderAuthMobileSkeleton on small screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: false });

		renderComponent(<HeaderAuthSkeleton />);

		expect(screen.getByTestId('HeaderAuthMobileSkeleton')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderAuthDesktopSkeleton_Wrapper')).not.toBeInTheDocument();
	});
});
