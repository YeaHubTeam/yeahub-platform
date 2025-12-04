import { screen, within } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import { CollectionBlock } from './CollectionBlock';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(() => ({
		isMobileS: false,
	})),
	useCurrentProject: jest.fn(),
}));

describe('CollectionBlock', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('render', () => {
		renderComponent(<CollectionBlock />);
		const container = screen.getByTestId('CollectionBlock');
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass('collection');
	});

	describe('TitleBlock', () => {
		test('renders title with correct content and classes for mobile/desktop', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: false });
			renderComponent(<CollectionBlock />);

			const titleBlock = screen.getByTestId('CollectionBlock_TitleBlock');
			const titleElement = within(titleBlock).getByText(new RegExp(Landing.COLLECTION_TITLE, 'i'));

			expect(titleBlock).toHaveClass('title-block');
			expect(titleElement).toHaveClass('title');
			expect(titleElement).toHaveClass('head3');
			expect(titleElement).toHaveTextContent(Landing.COLLECTION_TITLE.toUpperCase());
		});

		test('renders subtitle with correct content', () => {
			renderComponent(<CollectionBlock />);
			const titleBlock = screen.getByTestId('CollectionBlock_TitleBlock');
			const subtitleElement = within(titleBlock).getByText(
				new RegExp(Landing.COLLECTION_SUBTITLE, 'i'),
			);

			expect(subtitleElement).toHaveClass('body3');
			expect(subtitleElement).toHaveClass('subtitle');
			expect(subtitleElement).toHaveTextContent(Landing.COLLECTION_SUBTITLE);
		});
	});
});
