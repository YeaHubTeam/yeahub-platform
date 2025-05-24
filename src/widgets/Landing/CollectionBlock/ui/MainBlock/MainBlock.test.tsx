import { screen } from '@testing-library/react';
import Slider from 'react-slick';

import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { CollectionPreview } from '@/entities/collection';

import { sliderSettings } from '../../model/constants';

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
		expect(screen.getByTestId('MainBlock')).toBeInTheDocument();
	});

	test('render slider on desktop', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false });
		renderComponent(<MainBlock />);

		expect(screen.getByTestId('slider')).toBeInTheDocument();
	});

	test('render cards without slider on mobile', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });
		renderComponent(<MainBlock />);

		expect(screen.queryByTestId('slider')).not.toBeInTheDocument();
	});

	describe('CollectionPreview', () => {
		test('passes correct props', () => {
			renderComponent(<MainBlock />);

			const collectionPreviewCalls = (CollectionPreview as jest.Mock).mock.calls;

			collectionPreviewCalls.forEach(([props]) => {
				const { imageSrc, ...restCollection } = props.collection;

				expect(props).toMatchObject({
					variant: 'column',
					collection: {
						...restCollection,
						id: expect.any(Number),
						title: expect.any(String),
						isFree: expect.any(Boolean),
						tariff: expect.stringMatching(/free|premium/),
						description: expect.any(String),
						keywords: expect.any(Array),
						specializations: expect.arrayContaining([
							expect.objectContaining({
								id: expect.any(Number),
								title: expect.any(String),
								description: expect.any(String),
							}),
						]),
					},
				});

				expect(imageSrc).toBeDefined();
			});
		});
	});

	describe('Slider', () => {
		beforeEach(() => {
			jest.clearAllMocks();

			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false });
		});

		test('passes correct setting to Slider', () => {
			renderComponent(<MainBlock />);

			expect(Slider).toHaveBeenCalled();

			const sliderProps = (Slider as jest.Mock).mock.calls[0][0];

			expect(sliderProps).toMatchObject({
				dots: sliderSettings.dots,
				infinite: sliderSettings.infinite,
				speed: sliderSettings.speed,
				slidesToShow: sliderSettings.slidesToShow,
				variableWidth: sliderSettings.variableWidth,
				className: 'slider-container',
			});

			expect(sliderProps.responsive).toEqual(sliderSettings.responsive);
		});
	});
});
