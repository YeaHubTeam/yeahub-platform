import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { HeaderNavMobileSkeleton } from './HeaderNavMobile.skeleton';

describe('HeaderNavMobileSkeleton', () => {
	beforeEach(() => {
		renderComponent(<HeaderNavMobileSkeleton />);
	});
	test('should render wrapper with correct gap', () => {
		const wrapper = screen.getByTestId('HeaderNavMobileSkeleton_Wrapper');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('gap10');
	});

	test('should render two skeleton elements with correct sizes', () => {
		const skeletons = screen.getAllByTestId('HeaderNavMobileSkeleton');
		expect(skeletons).toHaveLength(2);
		expect(skeletons[0]).toHaveStyle({ width: '93px', height: '20px', borderRadius: '4px' });
		expect(skeletons[1]).toHaveStyle({ width: '20px', height: '20px', borderRadius: '4px' });
	});
});
