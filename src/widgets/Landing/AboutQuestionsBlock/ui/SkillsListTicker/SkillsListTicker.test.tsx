import { screen, within } from '@testing-library/react';
import Slider from 'react-slick';

import { renderComponent } from '@/shared/libs/jest';

import { SkillsListTicker } from './SkillsListTicker';

jest.mock('react-slick', () => ({
	__esModule: true,
	default: jest.fn(({ children }) => <div data-testid="slider">{children}</div>),
}));

describe('SkillsListTicker', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render SkillsListTicker', () => {
		const { container } = renderComponent(<SkillsListTicker />);
		expect(container).toBeInTheDocument();

		const list = screen.getByTestId('SkillsListTicker_List');
		const slider = screen.getByTestId('slider');

		expect(list).toHaveClass('list padding6');
		expect(slider).toBeInTheDocument();
	});

	test('should render correct count of cards', () => {
		renderComponent(<SkillsListTicker />);

		const slider = screen.getByTestId('slider');
		const chips = within(slider).getAllByTestId('Chip');

		expect(chips).toHaveLength(12);
	});

	test('should pass correct slider settings', () => {
		renderComponent(<SkillsListTicker />);

		const sliderProps = (Slider as jest.Mock).mock.calls[0][0];

		expect(sliderProps).toEqual(
			expect.objectContaining({
				slidesToShow: expect.any(Number),
				slidesToScroll: expect.any(Number),
			}),
		);

		expect(sliderProps.slidesToShow).toBe(9);
		expect(sliderProps.slidesToScroll).toBe(3);
	});
});
