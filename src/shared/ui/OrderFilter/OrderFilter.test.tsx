import { fireEvent, render, screen } from '@testing-library/react';

import { OrderFilter } from './OrderFilter';

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'sort.title': 'Сортировать по',
				'sort.ascending': 'Возрастанию',
				'sort.descending': 'Убыванию',
			};
			return translations[key] || key;
		},
	}),
}));

jest.mock('@/shared/config', () => ({
	i18Namespace: {
		translation: 'translation',
	},
	Translation: {
		SORT_TITLE: 'sort.title',
		SORT_ASCENDING: 'sort.ascending',
		SORT_DESCENDING: 'sort.descending',
	},
}));

jest.mock('@/shared/ui/BaseFilterSection', () => ({
	BaseFilterSection: <T,>({
		data,
		title,
		onClick,
	}: {
		title: string;
		data: Array<{ id: T; title: string; active?: boolean }>;
		onClick?: (id: T) => void;
	}) => (
		<div data-testid="base-filter-section">
			<div data-testid="filter-title">{title}</div>
			{data.map((item) => (
				<button
					key={item.id as string}
					data-testid={`filter-${item.id}`}
					data-active={item.active}
					onClick={() => onClick?.(item.id)}
				>
					{item.title}
				</button>
			))}
		</div>
	),
}));

const mockChangeOrder = jest.fn();

const renderOrderFilter = (props = {}) => {
	const defaultProps = {
		changeOrder: mockChangeOrder,
		selectedOrder: undefined,
	};

	return render(<OrderFilter {...defaultProps} {...props} />);
};

describe('OrderFilter', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Rendering', () => {
		test('renders BaseFilterSection', () => {
			renderOrderFilter();
			expect(screen.getByTestId('base-filter-section')).toBeInTheDocument();
		});

		test('renders both ASC and DESC options', () => {
			renderOrderFilter();
			expect(screen.getByTestId('filter-ASC')).toBeInTheDocument();
			expect(screen.getByTestId('filter-DESC')).toBeInTheDocument();
		});

		test('renders correct titles from translations', () => {
			renderOrderFilter();
			expect(screen.getByTestId('filter-ASC')).toHaveTextContent('Возрастанию');
			expect(screen.getByTestId('filter-DESC')).toHaveTextContent('Убыванию');
			expect(screen.getByTestId('filter-title')).toHaveTextContent('Сортировать по');
		});

		test('sets active correctly when no order selected', () => {
			renderOrderFilter({ selectedOrder: undefined });
			expect(screen.getByTestId('filter-ASC')).toHaveAttribute('data-active', 'false');
			expect(screen.getByTestId('filter-DESC')).toHaveAttribute('data-active', 'false');
		});

		test('sets active correctly when ASC is selected', () => {
			renderOrderFilter({ selectedOrder: 'ASC' });
			expect(screen.getByTestId('filter-ASC')).toHaveAttribute('data-active', 'true');
			expect(screen.getByTestId('filter-DESC')).toHaveAttribute('data-active', 'false');
		});

		test('sets active correctly when DESC is selected', () => {
			renderOrderFilter({ selectedOrder: 'DESC' });
			expect(screen.getByTestId('filter-ASC')).toHaveAttribute('data-active', 'false');
			expect(screen.getByTestId('filter-DESC')).toHaveAttribute('data-active', 'true');
		});
	});

	describe('Interactions', () => {
		test('calls changeOrder with ASC when clicking on ASC option', () => {
			renderOrderFilter({ selectedOrder: undefined });
			fireEvent.click(screen.getByTestId('filter-ASC'));
			expect(mockChangeOrder).toHaveBeenCalledWith('ASC');
		});

		test('calls changeOrder with DESC when clicking on DESC option', () => {
			renderOrderFilter({ selectedOrder: undefined });
			fireEvent.click(screen.getByTestId('filter-DESC'));
			expect(mockChangeOrder).toHaveBeenCalledWith('DESC');
		});

		test('calls changeOrder with undefined when clicking on already selected ASC', () => {
			renderOrderFilter({ selectedOrder: 'ASC' });
			fireEvent.click(screen.getByTestId('filter-ASC'));
			expect(mockChangeOrder).toHaveBeenCalledWith(undefined);
		});

		test('calls changeOrder with undefined when clicking on already selected DESC', () => {
			renderOrderFilter({ selectedOrder: 'DESC' });
			fireEvent.click(screen.getByTestId('filter-DESC'));
			expect(mockChangeOrder).toHaveBeenCalledWith(undefined);
		});

		test('switches from ASC to DESC correctly', () => {
			renderOrderFilter({ selectedOrder: 'ASC' });
			fireEvent.click(screen.getByTestId('filter-DESC'));
			expect(mockChangeOrder).toHaveBeenCalledWith('DESC');
		});

		test('switches from DESC to ASC correctly', () => {
			renderOrderFilter({ selectedOrder: 'DESC' });
			fireEvent.click(screen.getByTestId('filter-ASC'));
			expect(mockChangeOrder).toHaveBeenCalledWith('ASC');
		});
	});
});
