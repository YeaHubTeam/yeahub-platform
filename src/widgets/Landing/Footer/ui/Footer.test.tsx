import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { useProfileQuery } from '@/entities/auth';

import { Footer } from './Footer';

jest.mock('@/entities/auth', () => {
	const actual = jest.requireActual('@/entities/auth');
	return {
		...actual,
		useProfileQuery: jest.fn(),
	};
});

describe('Footer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render FooterSkeleton while profile is loading', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({ isLoading: true });

		renderComponent(<Footer />);

		expect(screen.getByTestId('FooterSkeleton')).toBeInTheDocument();
	});

	test('should render full Footer with FooterMain and FooterMeta after profile has loaded', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({ isLoading: false });

		renderComponent(<Footer />);

		const footer = screen.getByTestId('Footer');
		expect(footer).toBeInTheDocument();
		expect(footer).toHaveClass('footer');

		const content = screen.getByTestId('Footer_Content');
		expect(content).toBeInTheDocument();
		expect(content).toHaveClass('footer-content');

		expect(screen.getByTestId('FooterMain')).toBeInTheDocument();
		expect(screen.getByTestId('FooterMeta')).toBeInTheDocument();
	});
});
