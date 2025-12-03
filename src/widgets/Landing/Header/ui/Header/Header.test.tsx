import { screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import { useProfileQuery } from '@/entities/auth';

import { Header } from './Header';

jest.mock('@/entities/auth', () => {
	const actual = jest.requireActual('@/entities/auth');
	return {
		...actual,
		useProfileQuery: jest.fn(),
	};
});

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(),
}));

describe('Header', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render HeaderSkeleton while profileInfo is loading', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({ isLoading: true });
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: true });

		renderComponent(<Header />);

		expect(screen.getByTestId('HeaderSkeleton_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('Header')).not.toBeInTheDocument();
	});

	test('should render full Header after loading on large screen', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({ isLoading: false });
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: true });

		renderComponent(<Header />);

		expect(screen.getByTestId('Header')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderSkeleton_Wrapper')).not.toBeInTheDocument();

		expect(screen.getByTestId('AppLogo_Link')).toBeInTheDocument();

		expect(screen.getByTestId('HeaderNavDesktop_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('PopoverButton')).not.toBeInTheDocument();

		expect(screen.getByTestId('HeaderAuthDesktop_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderAuthMobile_IconButton')).not.toBeInTheDocument();
	});

	test('should render mobile Header with navigation and auth controls', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({ isLoading: false });
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: false });

		renderComponent(<Header />);

		expect(screen.queryByTestId('HeaderNavDesktop_Wrapper')).not.toBeInTheDocument();
		expect(screen.getByTestId('PopoverButton')).toBeInTheDocument();

		expect(screen.queryByTestId('HeaderAuthDesktop_Wrapper')).not.toBeInTheDocument();
		expect(screen.getByTestId('HeaderAuthMobile_IconButton')).toBeInTheDocument();
	});
});
