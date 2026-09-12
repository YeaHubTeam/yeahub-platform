import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs';

import { tablePaginationTestIds } from './constants';
import { TablePagination, TablePaginationProps } from './TablePagination';
import { TablePaginationSkeleton } from './TablePagination.skeleton';

const renderTablePagination = (props: Partial<TablePaginationProps> = {}) => {
	const onChangePage = jest.fn();

	renderComponent(<TablePagination page={1} total={100} onChangePage={onChangePage} {...props} />);
	return { onChangePage };
};

const renderSkeleton = () => {
	renderComponent(<TablePaginationSkeleton />);
	const skeleton = screen.getByTestId(tablePaginationTestIds.tablePaginationSkeleton);
	return skeleton;
};

describe('TablePagination', () => {
	const user = userEvent.setup();

	test('render with class name wrapper', () => {
		renderTablePagination();

		const pagination = screen.queryByTestId(tablePaginationTestIds.tablePagination);
		expect(pagination).toHaveClass('wrapper');
	});

	test('does not render when total equal 0', () => {
		renderTablePagination({ total: 0 });

		const pagination = screen.queryByTestId(tablePaginationTestIds.tablePagination);
		expect(pagination).not.toBeInTheDocument();
	});

	test('does not render when total less limit', () => {
		renderTablePagination({ total: 9 });

		const pagination = screen.queryByTestId(tablePaginationTestIds.tablePagination);
		expect(pagination).not.toBeInTheDocument();
	});

	test('does not render when total equal limit', () => {
		renderTablePagination({ total: 10 });

		const pagination = screen.queryByTestId(tablePaginationTestIds.tablePagination);
		expect(pagination).not.toBeInTheDocument();
	});

	test('render when total more limit', () => {
		renderTablePagination({ total: 11 });

		const pagination = screen.getByTestId(tablePaginationTestIds.tablePagination);
		expect(pagination).toBeInTheDocument();
	});

	test('render correct pages when use default limit', () => {
		renderTablePagination({ total: 23 });

		const lastPage = screen.getByRole('button', { name: '3' });
		const notFoundPage = screen.queryByRole('button', { name: '4' });

		expect(lastPage).toBeInTheDocument();
		expect(notFoundPage).not.toBeInTheDocument();
	});

	test('render correct pages when use custom limit', () => {
		renderTablePagination({ total: 25, limit: 5 });

		const lastPage = screen.getByRole('button', { name: '5' });
		const notFoundPage = screen.queryByRole('button', { name: '6' });

		expect(lastPage).toBeInTheDocument();
		expect(notFoundPage).not.toBeInTheDocument();
	});

	test('call onChangePage with previous page when prev btn clicked', async () => {
		const { onChangePage } = renderTablePagination({ page: 3 });

		const prevBtn = screen.getByLabelText('back button');
		await user.click(prevBtn);
		expect(onChangePage).toHaveBeenCalledWith(2);
	});

	test('call onChangePage with next page when next btn clicked', async () => {
		const { onChangePage } = renderTablePagination({ page: 3 });

		const prevBtn = screen.getByLabelText('forward button');
		await user.click(prevBtn);
		expect(onChangePage).toHaveBeenCalledWith(4);
	});

	test('call onChangePage when page button is clicked', async () => {
		const { onChangePage } = renderTablePagination({ page: 3 });

		const pageBtn = screen.getByRole('button', { name: '4' });
		await user.click(pageBtn);
		expect(onChangePage).toHaveBeenCalledWith(4);
	});

	test('does not call onChangePage when current page btn is clicked', async () => {
		const { onChangePage } = renderTablePagination({ page: 3 });

		const pageBtn = screen.getByRole('button', { name: '3' });
		await user.click(pageBtn);
		expect(onChangePage).not.toHaveBeenCalled();
	});
});

describe('TablePaginationSkeleton', () => {
	test('render', () => {
		const skeleton = renderSkeleton();
		expect(skeleton).toBeInTheDocument();
	});
});
