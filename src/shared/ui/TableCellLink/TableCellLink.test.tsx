import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { TableCellLink, TableCellLinkProps } from './TableCellLink';

const defaultProps: TableCellLinkProps = {
	to: '/user/1',
	text: 'mock user',
};

describe('TableCellLink', () => {
	test('renders link with correct text and href', () => {
		renderComponent(<TableCellLink {...defaultProps} />);

		const link = screen.getByRole('link', { name: defaultProps.text });

		expect(link).toHaveAttribute('href', defaultProps.to);
	});
});
