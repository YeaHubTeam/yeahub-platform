import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent';
import { OrderFilter } from './OrderFilter';

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
        <div data-testid="OrderFilter_Section">
            <div data-testid="OrderFilter_Title">{title}</div>
            {data.map((item) => (
                <button
                    key={item.id as string}
                    data-testid={`OrderFilter_${item.id}`}
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

    return renderComponent(
        <OrderFilter {...defaultProps} {...props} />
    );
};

describe('OrderFilter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders BaseFilterSection', () => {
            renderOrderFilter();
            expect(screen.getByTestId('OrderFilter_Section')).toBeInTheDocument();
        });

        test('renders both ASC and DESC options', () => {
            renderOrderFilter();
            expect(screen.getByTestId('OrderFilter_ASC')).toBeInTheDocument();
            expect(screen.getByTestId('OrderFilter_DESC')).toBeInTheDocument();
        });

        test('renders correct titles from translations', () => {
            renderOrderFilter();
            expect(screen.getByTestId('OrderFilter_ASC')).toHaveTextContent('sort.ascending');
            expect(screen.getByTestId('OrderFilter_DESC')).toHaveTextContent('sort.descending');
            expect(screen.getByTestId('OrderFilter_Title')).toHaveTextContent('sort.title');
        });

        test('sets active correctly when no order selected', () => {
            renderOrderFilter({ selectedOrder: undefined });
            expect(screen.getByTestId('OrderFilter_ASC')).toHaveAttribute('data-active', 'false');
            expect(screen.getByTestId('OrderFilter_DESC')).toHaveAttribute('data-active', 'false');
        });

        test('sets active correctly when ASC is selected', () => {
            renderOrderFilter({ selectedOrder: 'ASC' });
            expect(screen.getByTestId('OrderFilter_ASC')).toHaveAttribute('data-active', 'true');
            expect(screen.getByTestId('OrderFilter_DESC')).toHaveAttribute('data-active', 'false');
        });

        test('sets active correctly when DESC is selected', () => {
            renderOrderFilter({ selectedOrder: 'DESC' });
            expect(screen.getByTestId('OrderFilter_ASC')).toHaveAttribute('data-active', 'false');
            expect(screen.getByTestId('OrderFilter_DESC')).toHaveAttribute('data-active', 'true');
        });
    });

    describe('Interactions', () => {
        test('calls changeOrder with ASC when clicking on ASC option', () => {
            renderOrderFilter({ selectedOrder: undefined });
            fireEvent.click(screen.getByTestId('OrderFilter_ASC'));
            expect(mockChangeOrder).toHaveBeenCalledWith('ASC');
        });

        test('calls changeOrder with DESC when clicking on DESC option', () => {
            renderOrderFilter({ selectedOrder: undefined });
            fireEvent.click(screen.getByTestId('OrderFilter_DESC'));
            expect(mockChangeOrder).toHaveBeenCalledWith('DESC');
        });

        test('calls changeOrder with undefined when clicking on already selected ASC', () => {
            renderOrderFilter({ selectedOrder: 'ASC' });
            fireEvent.click(screen.getByTestId('OrderFilter_ASC'));
            expect(mockChangeOrder).toHaveBeenCalledWith(undefined);
        });

        test('calls changeOrder with undefined when clicking on already selected DESC', () => {
            renderOrderFilter({ selectedOrder: 'DESC' });
            fireEvent.click(screen.getByTestId('OrderFilter_DESC'));
            expect(mockChangeOrder).toHaveBeenCalledWith(undefined);
        });

        test('switches from ASC to DESC correctly', () => {
            renderOrderFilter({ selectedOrder: 'ASC' });
            fireEvent.click(screen.getByTestId('OrderFilter_DESC'));
            expect(mockChangeOrder).toHaveBeenCalledWith('DESC');
        });

        test('switches from DESC to ASC correctly', () => {
            renderOrderFilter({ selectedOrder: 'DESC' });
            fireEvent.click(screen.getByTestId('OrderFilter_ASC'));
            expect(mockChangeOrder).toHaveBeenCalledWith('ASC');
        });
    });
});