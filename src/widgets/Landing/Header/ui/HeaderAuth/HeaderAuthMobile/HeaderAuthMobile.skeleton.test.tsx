import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { HeaderAuthMobileSkeleton } from './HeaderAuthMobile.skeleton';

describe('HeaderAuthMobileSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render IconButtonSkeleton with correct class for mobile skeleton', () => {
		renderComponent(<HeaderAuthMobileSkeleton />);

		const skeleton = screen.getByTestId('HeaderAuthMobileSkeleton');
		expect(skeleton).toBeInTheDocument();
		expect(skeleton).toHaveClass('burger-button-skeleton');
	});
});
