import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { FooterMetaSkeleton } from './FooterMeta.skeleton';

describe('FooterMetaSkeleton', () => {
	beforeEach(() => {
		renderComponent(<FooterMetaSkeleton />);
	});

	test('renders Flex wrapper with FooterCopyrightSkeleton and FooterLinksSkeleton', () => {
		const flexWrapper = screen.getByTestId('FooterMetaSkeleton');
		expect(flexWrapper).toBeInTheDocument();
		expect(flexWrapper).toHaveClass('justify-between');
		expect(flexWrapper).toHaveClass('align-center');

		expect(screen.getByTestId('FooterCopyrightSkeleton')).toBeInTheDocument();
		expect(screen.getByTestId('FooterLinksSkeleton')).toBeInTheDocument();
	});
});
