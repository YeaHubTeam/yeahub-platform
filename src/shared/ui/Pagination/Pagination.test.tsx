import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from './Pagination';

describe('Pagination component', () => {
	const mockOnPrevPageClick = jest.fn();
	const mockOnNextPageClick = jest.fn();
	const mockOnChangePage = jest.fn();

	const defaultProps = {
		onPrevPageClick: mockOnPrevPageClick,
		onNextPageClick: mockOnNextPageClick,
		onChangePage: mockOnChangePage,
		page: 1,
		totalPages: 10,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should not render when totalPages is 1 or less', () => {
		const { container } = render(<Pagination {...defaultProps} totalPages={1} />);
		expect(container).toBeEmptyDOMElement();
	});

	test('should render correctly with default props', () => {
		render(<Pagination {...defaultProps} />);

		expect(screen.getByLabelText('back button')).toBeInTheDocument();
		expect(screen.getByLabelText('forward button')).toBeInTheDocument();

		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
		expect(screen.getByText('3')).toBeInTheDocument();
		expect(screen.getByText('4')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();

		expect(screen.getByTestId('dots-icon')).toBeInTheDocument();
		expect(screen.getByText('10')).toBeInTheDocument();
	});

	test('should disable prev button on first page', () => {
		render(<Pagination {...defaultProps} page={1} />);
		expect(screen.getByLabelText('back button')).toBeDisabled();
	});

	test('should disable next button on last page', () => {
		render(<Pagination {...defaultProps} page={10} />);
		expect(screen.getByLabelText('forward button')).toBeDisabled();
	});

	test('should call onPrevPageClick when prev button is clicked', () => {
		render(<Pagination {...defaultProps} page={2} />);
		fireEvent.click(screen.getByLabelText('back button'));
		expect(mockOnPrevPageClick).toHaveBeenCalledTimes(1);
	});

	test('should call onNextPageClick when next button is clicked', () => {
		render(<Pagination {...defaultProps} page={2} />);
		fireEvent.click(screen.getByLabelText('forward button'));
		expect(mockOnNextPageClick).toHaveBeenCalledTimes(1);
	});

	test('should call onChangePage when page number is clicked', () => {
		render(<Pagination {...defaultProps} />);
		fireEvent.click(screen.getByText('3'));
		expect(mockOnChangePage).toHaveBeenCalledWith(3);
	});

	test('should not call onChangePage when current page is clicked', () => {
		render(<Pagination {...defaultProps} page={3} />);
		fireEvent.click(screen.getByText('3'));
		expect(mockOnChangePage).not.toHaveBeenCalled();
	});

	test('should show correct page range when page is in the middle', () => {
		render(<Pagination {...defaultProps} page={5} />);

		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getAllByTestId('dots-icon')).toHaveLength(2);

		expect(screen.getByText('3')).toBeInTheDocument();
		expect(screen.getByText('4')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.getByText('6')).toBeInTheDocument();
		expect(screen.getByText('7')).toBeInTheDocument();

		expect(screen.getByText('10')).toBeInTheDocument();
	});

	test('should show correct active page style', () => {
		render(<Pagination {...defaultProps} page={3} />);
		const activeButton = screen.getByText('3').closest('button');
		expect(activeButton).toHaveClass('page-button-active');
	});

	test('should show only next ellipsis when near start', () => {
		render(<Pagination {...defaultProps} page={2} />);
		const dotsIcons = screen.getAllByTestId('dots-icon');
		expect(dotsIcons).toHaveLength(1);
		expect(screen.getByText('10')).toBeInTheDocument();
	});

	test('should show only prev ellipsis when near end', () => {
		render(<Pagination {...defaultProps} page={9} />);
		const dotsIcons = screen.getAllByTestId('dots-icon');
		expect(dotsIcons).toHaveLength(1);
		expect(screen.getByText('1')).toBeInTheDocument();
	});
});
