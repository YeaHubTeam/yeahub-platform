import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { AuthLayoutSkeleton } from './AuthLayout.skeleton';

describe('AuthLayoutSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		renderComponent(<AuthLayoutSkeleton />);
	});

	test('renders main wrapper', () => {
		const wrapper = screen.getByTestId('AuthLayoutSkeleton_Wrapper');
		expect(wrapper).toBeInTheDocument();
	});

	test('renders aside skeleton', () => {
		const aside = screen.getByRole('complementary');
		expect(aside).toBeInTheDocument();
	});

	test('renders main content area', () => {
		const main = screen.getByTestId('Loader_Wrapper');
		expect(main).toBeInTheDocument();
	});
});
