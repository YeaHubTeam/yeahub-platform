import { screen } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { useScreenSize, renderComponent } from '@/shared/libs';

import { AdditionalBlock } from './AdditionalBlock';

jest.mock('@/shared/libs/dom', () => ({
	useScreenSize: jest.fn(() => ({
		isMobileS: false,
	})),
}));

describe('AdditionalBlock', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('render', () => {
		renderComponent(<AdditionalBlock />);

		const component = screen.getByTestId('AdditionalBlock');
		expect(component).toBeInTheDocument();
	});

	test('should render expand button only on mobile', () => {
		require('@/shared/libs').useScreenSize.mockReturnValue({ isMobileS: false });
		const { rerender } = renderComponent(<AdditionalBlock />);
		expect(screen.queryByTestId('AdditionalBlock_ExpandButton')).toBeNull();

		require('@/shared/libs').useScreenSize.mockReturnValue({ isMobileS: true });
		rerender(<AdditionalBlock />);
		const button = screen.getByTestId('AdditionalBlock_ExpandButton');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(Landing.COLLECTION_EXPAND);
		expect(button).toHaveClass('expand-button');
	});

	describe('LinkButton', () => {
		test('should render main action button', () => {
			renderComponent(<AdditionalBlock />);

			const button = screen.getByTestId('AdditionalBlock_LinkButton');
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass('button');
			expect(button).toHaveTextContent(Landing.COLLECTION_LINK);
		});
	});

	describe('AdditionalThirdTitle', () => {
		test('should apply correct text variant based on screen size', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: false });

			const { rerender } = renderComponent(<AdditionalBlock />);
			const card = screen.getByTestId('AdditionalBlock_Third');
			const textElement = card?.querySelector('p');

			expect(card).toHaveClass('additional-third');
			expect(textElement).toHaveClass('body5');

			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: true });
			rerender(<AdditionalBlock />);

			const mobileTextElement = document.querySelector('.additional-third p');
			expect(mobileTextElement).toHaveClass('body3');
			expect(mobileTextElement).toHaveTextContent(Landing.COLLECTION_ADDITIONAL_THIRD);
		});
	});

	describe('AdditionalSecondTitle', () => {
		test('should apply correct text variant and translation', () => {
			renderComponent(<AdditionalBlock />);
			const card = screen.getByTestId('AdditionalBlock_Second');
			const textElement = card?.querySelector('p');

			expect(card).toHaveClass('additional-second');
			expect(textElement).toHaveClass('body3');
			expect(textElement).toHaveTextContent(Landing.COLLECTION_ADDITIONAL_SECOND);
		});
	});

	describe('AdditionalFirstTitle', () => {
		test('should apply correct text variant and translation', () => {
			renderComponent(<AdditionalBlock />);
			const card = screen.getByTestId('AdditionalBlock_First');
			const textElement = card?.querySelector('p');

			expect(card).toHaveClass('additional-first');
			expect(textElement).toHaveClass('body3');
			expect(textElement).toHaveTextContent(Landing.COLLECTION_ADDITIONAL_FIRST);
		});
	});
});
