import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { TableCellLink, TableCellLinkProps } from './TableCellLink';

const defaultProps: TableCellLinkProps = {
	to: '/user/1',
	text: 'mock user',
};

describe('TableCellLink', () => {
	beforeEach(() => {
		renderComponent(<TableCellLink {...defaultProps} />);
	});

	test('renders link with correct href', () => {
		const link = screen.getByRole('link', { name: defaultProps.text });

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', defaultProps.to);
	});
	test('renders text content', () => {
		const textElement = screen.getByTestId('table-cell-link-text');

		expect(textElement).toBeInTheDocument();
		expect(textElement).toHaveTextContent(defaultProps.text);
	});
	test('renders text with correct variant and color', () => {
		const textElement = screen.getByTestId('table-cell-link-text');

		expect(textElement).toHaveClass('body3-accent');
		expect(textElement).toHaveClass('text-purple-700');
	});
});
