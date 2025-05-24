import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { filtersList } from '../../model/constants';

import { FiltersBlock } from './FiltersBlock';

jest.mock('../FilterChip/FilterChip', () => ({
	FilterChip: jest.fn(({ src, alt }) => (
		<div data-testid="filter-chip" data-src={src} data-alt={alt} />
	)),
}));

describe('FiltersBlock', () => {
	test('render', () => {
		renderComponent(<FiltersBlock />);

		expect(screen.getByTestId('FiltersBlock')).toBeInTheDocument();
	});

	test('renders correct number of filter chips', () => {
		renderComponent(<FiltersBlock />);
		const chips = screen.getAllByTestId('filter-chip');
		expect(chips).toHaveLength(filtersList.length);
	});

	test('has correct Flex container', () => {
		renderComponent(<FiltersBlock />);

		const flexContainer = screen.getByTestId('FiltersBlock').firstChild;
		expect(flexContainer).toHaveClass('slider-container');
	});
});
