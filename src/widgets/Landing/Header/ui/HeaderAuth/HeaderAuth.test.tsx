import { screen } from '@testing-library/react';

import { useScreenSize, renderComponent } from '@/shared/libs';

import { HeaderAuth } from './HeaderAuth';

jest.mock('@/shared/libs/dom', () => ({
	useScreenSize: jest.fn(),
}));

describe('HeaderAuth', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render HeaderAuthDesktop on large screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: true });

		renderComponent(<HeaderAuth />);

		expect(screen.getByTestId('HeaderAuthDesktop_Wrapper')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderAuthMobile_IconButton')).not.toBeInTheDocument();
	});

	test('should render HeaderAuthMobile on small screen', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isLargeScreen: false });

		renderComponent(<HeaderAuth />);

		expect(screen.getByTestId('HeaderAuthMobile_IconButton')).toBeInTheDocument();
		expect(screen.queryByTestId('HeaderAuthDesktop_Wrapper')).not.toBeInTheDocument();
	});
});
