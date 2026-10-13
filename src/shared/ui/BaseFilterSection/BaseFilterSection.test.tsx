import { screen } from '@testing-library/react';
import uE from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs';

import { chipTestIDs } from '../Chip/constants';

import {
	BaseFilterSection,
	BaseFilterSectionProps,
	BaseFilterSectionRenderItemArgs,
	BaseFilterItem,
} from './BaseFilterSection';
import { BaseFilterSectionSkeleton } from './BaseFilterSection.skeleton';

const render = (
	props: Partial<BaseFilterSectionProps<number>> & Pick<BaseFilterSectionProps<number>, 'data'>,
) => {
	return renderComponent(<BaseFilterSection title="Test Title" {...props} />);
};

describe('BaseFilterSection', () => {
	const userEvent = uE.setup();

	describe('default rendering (Chip)', () => {
		const mockData = [
			{ id: 1, title: 'Item 1', imageSrc: 'image1.png', active: true },
			{ id: 2, title: 'Item 2', imageSrc: null, active: false },
		];

		it('renders the section title', () => {
			render({ data: mockData });
			expect(screen.getByText('Test Title')).toBeInTheDocument();
		});

		it('renders one chip per data item', () => {
			render({ data: mockData });
			expect(screen.getAllByTestId(chipTestIDs.chip)).toHaveLength(mockData.length);
		});

		it('renders nothing and does not crash when data is empty', () => {
			render({ data: [] });
			expect(screen.queryAllByTestId(chipTestIDs.chip)).toHaveLength(0);
		});

		it('calls onClick with the item id when a chip is clicked', async () => {
			const onClick = jest.fn();
			render({ data: mockData, onClick });

			await userEvent.click(screen.getAllByTestId(chipTestIDs.chip)[0]);
			expect(onClick).toHaveBeenCalledWith(1);
		});

		it('does not throw when a chip is clicked and onClick is not passed', async () => {
			render({ data: mockData });
			await expect(
				userEvent.click(screen.getAllByTestId(chipTestIDs.chip)[0]),
			).resolves.not.toThrow();
		});

		it('renders an <img> when the item has imageSrc and no iconName', () => {
			render({ data: [{ id: 1, title: 'Photo item', imageSrc: 'photo.png' }] });
			expect(screen.getByAltText('Photo item')).toBeInTheDocument();
		});

		it('does not render an <img> when the item has iconName', () => {
			render({ data: [{ id: 1, title: 'Icon item', imageSrc: 'photo.png', iconName: 'search' }] });
			expect(screen.queryByAltText('Icon item')).not.toBeInTheDocument();
		});

		it('renders no image, no icon and no prefix when neither imageSrc nor iconName is set', () => {
			render({ data: [{ id: 1, title: 'Plain item' }] });
			expect(screen.queryByAltText('Plain item')).not.toBeInTheDocument();
			expect(screen.queryByTestId(chipTestIDs.prefix)).not.toBeInTheDocument();
		});

		it('uses default imageSize (20) when imageSize is not passed', () => {
			render({ data: [{ id: 1, title: 'Photo item', imageSrc: 'photo.png' }] });
			expect(screen.getByAltText('Photo item')).toHaveStyle({ width: '20px', height: '20px' });
		});

		it('applies a custom imageSize when passed', () => {
			render({ data: [{ id: 1, title: 'Photo item', imageSrc: 'photo.png' }], imageSize: 36 });
			expect(screen.getByAltText('Photo item')).toHaveStyle({ width: '36px', height: '36px' });
		});
	});

	describe('custom renderItem', () => {
		const renderItemStub = ({
			item,
			onClick,
			disabled,
			active,
		}: BaseFilterSectionRenderItemArgs<number>) => (
			<button
				data-testid={`custom-item-${item.id}`}
				onClick={onClick}
				disabled={disabled}
				data-active={String(active)}
			>
				{item.title}
			</button>
		);

		it('uses renderItem instead of the default Chip when passed', () => {
			render({ data: [{ id: 1, title: 'Custom item' }], renderItem: renderItemStub });
			expect(screen.getByTestId('custom-item-1')).toBeInTheDocument();
			expect(screen.queryByTestId(chipTestIDs.chip)).not.toBeInTheDocument();
		});

		it('passes a working onClick handler to renderItem when top-level onClick is passed', async () => {
			const onClick = jest.fn();
			render({ data: [{ id: 1, title: 'Custom item' }], onClick, renderItem: renderItemStub });

			await userEvent.click(screen.getByTestId('custom-item-1'));
			expect(onClick).toHaveBeenCalledWith(1);
		});

		it('passes onClick as undefined to renderItem when top-level onClick is not passed', async () => {
			render({ data: [{ id: 1, title: 'Custom item' }], renderItem: renderItemStub });
			await expect(userEvent.click(screen.getByTestId('custom-item-1'))).resolves.not.toThrow();
		});

		it.each`
			globalDisabled | itemDisabled | itemActive | isAllActive | expectedDisabled | expectedActive
			${false}       | ${false}     | ${true}    | ${false}    | ${false}         | ${true}
			${false}       | ${false}     | ${false}   | ${false}    | ${false}         | ${false}
			${true}        | ${false}     | ${true}    | ${false}    | ${true}          | ${false}
			${false}       | ${true}      | ${true}    | ${false}    | ${true}          | ${false}
			${true}        | ${false}     | ${false}   | ${true}     | ${true}          | ${true}
			${false}       | ${false}     | ${false}   | ${true}     | ${false}         | ${true}
		`(
			'disabled=$globalDisabled, item.disabled=$itemDisabled, item.active=$itemActive, isAllActive=$isAllActive',
			({
				globalDisabled,
				itemDisabled,
				itemActive,
				isAllActive,
				expectedDisabled,
				expectedActive,
			}) => {
				render({
					data: [{ id: 1, title: 'Item', disabled: itemDisabled, active: itemActive }],
					disabled: globalDisabled,
					isAllActive,
					renderItem: renderItemStub,
				});

				const el = screen.getByTestId('custom-item-1');
				expect(el).toHaveAttribute('data-active', String(expectedActive));
				expectedDisabled ? expect(el).toBeDisabled() : expect(el).not.toBeDisabled();
			},
		);
	});

	describe('data prop edge case', () => {
		it('does not crash when data is undefined', () => {
			expect(() =>
				render({ data: undefined as unknown as BaseFilterItem<number>[] }),
			).not.toThrow();
		});
	});

	describe('BaseFilterSectionSkeleton', () => {
		test('render', () => {
			const { container } = renderComponent(<BaseFilterSectionSkeleton length={2} />);
			expect(container.firstChild).toBeInTheDocument();
		});

		test('render with custom width', () => {
			const { container } = renderComponent(<BaseFilterSectionSkeleton length={1} width={50} />);
			const skeletons = container.querySelectorAll('div[class*="skeleton"]');
			expect(skeletons[1]).toHaveStyle({ width: '50px' });
		});
	});
});
