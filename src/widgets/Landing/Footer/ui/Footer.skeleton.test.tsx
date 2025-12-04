import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { FooterSkeleton } from './Footer.skeleton';

describe('FooterSkeleton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		renderComponent(<FooterSkeleton />);
	});

	test('should render FooterSkeleton wrapper with correct class', () => {
		const wrapper = screen.getByTestId('FooterSkeleton');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('footer');
	});

	test('should render FooterSkeleton content wrapper with correct class', () => {
		const contentWrapper = screen.getByTestId('FooterSkeleton_Content');
		expect(contentWrapper).toBeInTheDocument();
		expect(contentWrapper).toHaveClass('footer-content');
	});

	test('should render FooterMainSkeleton and FooterMetaSkeleton inside FooterSkeleton', () => {
		expect(screen.getByTestId('FooterMainSkeleton')).toBeInTheDocument();
		expect(screen.getByTestId('FooterMetaSkeleton')).toBeInTheDocument();
	});
});
