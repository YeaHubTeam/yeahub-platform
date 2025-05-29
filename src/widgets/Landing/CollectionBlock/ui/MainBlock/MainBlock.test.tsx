import { screen } from '@testing-library/react';
import Slider from 'react-slick';

import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { MainBlock } from './MainBlock';

jest.mock('@/shared/hooks', () => ({
	useScreenSize: jest.fn(() => ({
		isMobileS: false,
	})),
}));

jest.mock('react-slick', () => ({
	__esModule: true,
	default: jest.fn(({ children }) => <div data-testid="slider">{children}</div>),
}));

jest.mock('@/entities/collection', () => ({
	CollectionPreview: jest.fn(({ collection }) => (
		<div data-testid={`collection-${collection.id}`}>{collection.title}</div>
	)),
}));

describe('MainBlock', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('render', () => {
		renderComponent(<MainBlock />);
		expect(screen.getByTestId('MainBlock_Desktop')).toBeInTheDocument();
	});

	test('render slider on desktop', () => {
		renderComponent(<MainBlock />);

		expect(screen.getByTestId('slider')).toBeInTheDocument();
		expect(screen.getByTestId('MainBlock_Desktop')).toBeInTheDocument();
		expect(screen.queryByTestId('MainBlock_Mobile')).not.toBeInTheDocument();
	});

	test('render cards without slider on mobile', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });
		renderComponent(<MainBlock />);

		expect(screen.queryByTestId('slider')).not.toBeInTheDocument();
		expect(screen.queryByTestId('MainBlock_Desktop')).not.toBeInTheDocument();
		expect(screen.getByTestId('MainBlock_Mobile')).toBeInTheDocument();
	});

	test('renders correct count of cards', () => {
		renderComponent(<MainBlock />);
		const cards = screen.getAllByTestId('MainBlock_Card');
		expect(cards).toHaveLength(3);
	});

	describe('Slider', () => {
		beforeEach(() => {
			jest.clearAllMocks();
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false });
		});

		test('passes correct slider settings', () => {
			renderComponent(<MainBlock />);

			const sliderProps = (Slider as jest.Mock).mock.calls[0][0];

			expect(sliderProps).toEqual(
				expect.objectContaining({
					slidesToShow: expect.any(Number),
					variableWidth: expect.any(Boolean),
					responsive: expect.any(Array),
				}),
			);

			expect(sliderProps.slidesToShow).toBe(3);
			expect(sliderProps.variableWidth).toBe(false);
			expect(sliderProps.responsive).toEqual([
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
					},
				},
			]);
		});
	});
});
