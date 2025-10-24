import { screen, within } from '@testing-library/react';
import Slider from 'react-slick';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { InterviewMaterials } from './InterviewMaterials';

jest.mock('../About/About', () => ({
	About: () => <div data-testid="about"></div>,
}));

jest.mock('react-slick', () => ({
	__esModule: true,
	default: jest.fn(({ children }) => <div data-testid="slider">{children}</div>),
}));

describe('InterviewMaterials', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render InterviewMaterials', () => {
		const { container } = renderComponent(<InterviewMaterials />);
		expect(container).toBeInTheDocument();

		const about = screen.getByTestId('about');
		const content = screen.getByTestId('InterviewMaterials_content');
		const cards = screen.getByTestId('InterviewMaterials_cards');

		expect(about).toBeInTheDocument();
		expect(content).toHaveClass('content');
		expect(cards).toHaveClass('cards');
	});

	test('should render correct count of cards', () => {
		renderComponent(<InterviewMaterials />);
		const slider = screen.getByTestId('slider');
		const cards = within(slider).getAllByTestId('Card');

		expect(cards).toHaveLength(3);
	});

	test('should pass correct slider settings', () => {
		renderComponent(<InterviewMaterials />);

		const sliderProps = (Slider as jest.Mock).mock.calls[0][0];

		expect(sliderProps).toEqual(
			expect.objectContaining({
				slidesToShow: expect.any(Number),
				slidesToScroll: expect.any(Number),
				variableWidth: expect.any(Boolean),
			}),
		);

		expect(sliderProps.slidesToShow).toBe(2);
		expect(sliderProps.slidesToScroll).toBe(1);
		expect(sliderProps.variableWidth).toBe(true);
	});
});
