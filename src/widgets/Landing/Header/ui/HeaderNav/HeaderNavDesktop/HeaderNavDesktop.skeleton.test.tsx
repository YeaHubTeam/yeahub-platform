import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { HeaderNavDesktopSkeleton } from './HeaderNavDesktop.skeleton';

describe('HeaderNavDesktopSkeleton', () => {
	test('should render skeleton placeholders with correct styles', () => {
		renderComponent(<HeaderNavDesktopSkeleton />);

		const wrapper = screen.getByTestId('HeaderNavDesktopSkeleton_Wrapper');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('gap26');

		const skeletons = screen.getAllByTestId('HeaderNavDesktopSkeleton');
		expect(skeletons).toHaveLength(2);

		expect(skeletons[0]).toBeInTheDocument();
		expect(skeletons[0]).toHaveStyle({ width: '120px' });
		expect(skeletons[0]).toHaveStyle({ height: '20px' });
		expect(skeletons[0]).toHaveStyle({ borderRadius: '4px' });

		expect(skeletons[1]).toBeInTheDocument();
		expect(skeletons[1]).toHaveStyle({ width: '90px' });
		expect(skeletons[1]).toHaveStyle({ height: '20px' });
		expect(skeletons[1]).toHaveStyle({ borderRadius: '4px' });
	});
});
