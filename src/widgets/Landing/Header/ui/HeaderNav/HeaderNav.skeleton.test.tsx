import { screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import { HeaderNavSkeleton } from './HeaderNav.skeleton';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(() => ({ isLargeScreen: true })),
}));

describe('HeaderNavSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render desktop skeleton on large screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: true });

		renderComponent(<HeaderNavSkeleton />);

		expect(screen.getByTestId('HeaderNavDesktopSkeleton_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderNavMobileSkeleton_Wrapper')).not.toBeInTheDocument();
	});

	test('should render mobile skeleton on small screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: false });

		renderComponent(<HeaderNavSkeleton />);

		expect(screen.getByTestId('HeaderNavMobileSkeleton_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderNavDesktopSkeleton_Wrapper')).not.toBeInTheDocument();
	});
});
