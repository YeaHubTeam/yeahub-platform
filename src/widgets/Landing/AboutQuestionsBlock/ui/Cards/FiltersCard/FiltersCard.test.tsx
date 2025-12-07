import { screen } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { renderComponent } from '@/shared/libs';

import { FiltersCard } from './FiltersCard';

jest.mock('../../../model/constants', () => ({
	blocks: {
		filters: { src: '/assets/filtersBlock.avif', alt: 'filters' },
	},
}));

describe('FiltersCard', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		renderComponent(<FiltersCard />);
	});

	test('should render FiltersCard image content', () => {
		const image = screen.getByAltText('filters');

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/assets/filtersBlock.avif');
	});

	test('should render correct FiltersCard title', () => {
		const image = screen.getByAltText('filters');

		const titleElement = image.nextElementSibling;
		expect(titleElement).toHaveTextContent(Landing.FILTERS_TITLE);
	});

	test('should render correct FiltersCard description', () => {
		const image = screen.getByAltText('filters');

		const descriptionElement = image.nextElementSibling?.nextElementSibling;
		expect(descriptionElement).toHaveTextContent(Landing.FILTERS_DESCRIPTION);
	});
});
