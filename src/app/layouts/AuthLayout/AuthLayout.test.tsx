import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { AuthLayoutSkeleton } from './AuthLayout/AuthLayout.skeleton';

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
		const aside = screen.getByTestId('AuthLayoutSkeleton_Aside');
		expect(aside).toBeInTheDocument();
	});

	test('renders main content area', () => {
		const main = screen.getByTestId('AuthLayoutSkeleton_Main');
		expect(main).toBeInTheDocument();
	});
});
