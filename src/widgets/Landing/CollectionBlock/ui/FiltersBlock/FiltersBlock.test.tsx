import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { filtersList } from '../../model/constants';

import { FiltersBlock } from './FiltersBlock';

jest.mock('../FilterChip/FilterChip', () => ({
	FilterChip: jest.fn(({ src, alt }) => (
		<div data-testid="filter-chip" data-src={src} data-alt={alt} />
	)),
}));

describe('FiltersBlock', () => {
	beforeEach(() => {
		renderComponent(<FiltersBlock />);
	});

	test('render', () => {
		const filterElement = screen.getByTestId('FiltersBlock');
		expect(filterElement).toHaveClass('list');
		expect(filterElement).toBeInTheDocument();
	});

	test('renders correct number of filter chips', () => {
		const container = screen.getByTestId('FiltersBlock_SliderContainer');
		expect(container.children).toHaveLength(filtersList.length);
		expect(container).toHaveClass('slider-container');
	});
});
