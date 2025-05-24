import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { AdditionalBlock } from './AdditionalBlock';

jest.mock('@/shared/hooks', () => ({
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

		const component = document.querySelector('.additional-block');
		expect(component).toBeInTheDocument();
	});

	test('should render expand button only on mobile', () => {
		require('@/shared/hooks').useScreenSize.mockReturnValue({ isMobileS: false });
		const { rerender } = renderComponent(<AdditionalBlock />);
		expect(document.querySelector('.expand-button')).toBeNull();

		require('@/shared/hooks').useScreenSize.mockReturnValue({ isMobileS: true });
		rerender(<AdditionalBlock />);
		expect(document.querySelector('.expand-button')).toBeInTheDocument();
	});

	describe('LinkButton', () => {
		test('should render main action button', () => {
			renderComponent(<AdditionalBlock />);

			const button = document.querySelector('.button');
			expect(button).toBeInTheDocument();
			expect(button?.tagName).toBe('BUTTON');
		});

		test('should contain text content', () => {
			renderComponent(<AdditionalBlock />);

			const button = document.querySelector('.button');
			expect(button?.textContent).toBeTruthy();
		});
	});

	describe('AdditionalThirdTitle', () => {
		test('should apply correct text variant based on screen size', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: false });

			const { rerender } = renderComponent(<AdditionalBlock />);
			const card = document.querySelector('.additional-third');
			const textElement = card?.querySelector('p');

			expect(textElement).toHaveClass('body5');
			expect(textElement).not.toHaveClass('body3');

			(useScreenSize as jest.Mock).mockReturnValue({ isMobileS: true });
			rerender(<AdditionalBlock />);

			const mobileTextElement = document.querySelector('.additional-third p');
			expect(mobileTextElement).toHaveClass('body3');
			expect(mobileTextElement).not.toHaveClass('body5');
		});
	});
});
