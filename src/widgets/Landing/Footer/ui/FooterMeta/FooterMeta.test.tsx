import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { FooterMeta } from './FooterMeta';

describe('FooterMeta', () => {
	beforeEach(() => {
		renderComponent(<FooterMeta />);
	});

	test('should render Flex wrapper with FooterCopyright and FooterLinks components', () => {
		const flexWrapper = screen.getByTestId('FooterMeta');
		expect(flexWrapper).toBeInTheDocument();
		expect(flexWrapper).toHaveClass('justify-between');
		expect(flexWrapper).toHaveClass('align-center');

		expect(screen.getByTestId('FooterCopyright')).toBeInTheDocument();
		expect(screen.getByTestId('FooterLinks')).toBeInTheDocument();
	});
});
