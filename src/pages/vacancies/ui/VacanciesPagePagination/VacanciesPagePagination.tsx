import { TablePagination } from '@/shared/ui/TablePagination';

interface VacanciesPagePaginationProps {
	total: number;
	limit: number;
	currentPage: number;
	onChangePage: (page: number) => void;
}

export const VacanciesPagePagination = ({
	total,
	limit,
	currentPage,
	onChangePage,
}: VacanciesPagePaginationProps) => {
	return (
		<TablePagination page={currentPage} onChangePage={onChangePage} limit={limit} total={total} />
	);
};
