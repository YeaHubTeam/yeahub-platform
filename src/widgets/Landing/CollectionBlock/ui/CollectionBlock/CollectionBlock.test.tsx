import { screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { CollectionBlock } from './CollectionBlock';

jest.mock('@/shared/hooks', () => ({
	useScreenSize: jest.fn(),
}));

describe('CollectionBlock', () => {
	beforeEach(() => {
		(useScreenSize as jest.Mock).mockReturnValue({
			isMobile: false,
		});

		renderComponent(<CollectionBlock />);
	});

	test('render', () => {
		expect(screen.getByTestId('CollectionBlock')).toBeInTheDocument();
	});

	test('has correct CSS class', () => {
		const container = screen.getByTestId('CollectionBlock');

		expect(container).toHaveClass('collection');
	});

	test('render title in uppercase', () => {
		renderComponent(<CollectionBlock />);

		const title = document.querySelector('.title')?.textContent;
		expect(title).toBe(title?.toUpperCase());
	});
});
