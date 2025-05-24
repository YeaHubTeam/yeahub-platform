import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
	const testProps = {
		src: 'test-image.png',
		alt: 'Test Alt Text',
	};

	test('should render with correct props', () => {
		renderComponent(<FilterChip {...testProps} />);

		const chipElement = screen.getByText(testProps.alt).closest('div');
		expect(chipElement).toBeInTheDocument();

		const image = screen.getByRole('img', { name: testProps.alt });
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', testProps.src);
		expect(image).toHaveAttribute('alt', testProps.alt);
		expect(image).toHaveAttribute('loading', 'lazy');
	});

	test('should apply correct variant class', () => {
		renderComponent(<FilterChip {...testProps} />);

		const chipElement = screen.getByText(testProps.alt).closest('div');
		expect(chipElement).toHaveClass('big');
	});
});
