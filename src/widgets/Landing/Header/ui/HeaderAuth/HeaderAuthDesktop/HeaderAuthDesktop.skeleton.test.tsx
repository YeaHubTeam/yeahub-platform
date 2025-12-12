import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { HeaderAuthDesktopSkeleton } from './HeaderAuthDesktop.skeketon';

describe('HeaderAuthDesktopSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		renderComponent(<HeaderAuthDesktopSkeleton />);
	});

	test('should render Flex wrapper with correct classes', () => {
		const flexWrapper = screen.getByTestId('HeaderAuthDesktopSkeleton_Wrapper');
		expect(flexWrapper).toBeInTheDocument();
		expect(flexWrapper).toHaveClass('justify-between');
		expect(flexWrapper).toHaveClass('align-center');
		expect(flexWrapper).toHaveClass('gap26');
	});

	test('should render two ButtonSkeleton components with correct classes and styles', () => {
		const skeletons = screen.getAllByTestId('ButtonSkeleton');
		expect(skeletons).toHaveLength(2);
		expect(skeletons[0]).toHaveClass('button-small');
		expect(skeletons[0]).toHaveStyle({ width: '40px' });
		expect(skeletons[1]).toHaveClass('button-large');
		expect(skeletons[1]).toHaveStyle({ width: '171px' });
	});
});
