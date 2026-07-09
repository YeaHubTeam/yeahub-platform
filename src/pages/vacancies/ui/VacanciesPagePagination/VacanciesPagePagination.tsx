import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { TablePagination } from '@/shared/ui/TablePagination';

interface VacanciesPagePaginationProps {
	total: number;
	limit: number;
	currentPage: number;
}

export const VacanciesPagePagination = ({
	total,
	limit,
	currentPage,
}: VacanciesPagePaginationProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const navigateToPage = (page: number) => {
		const params = new URLSearchParams(searchParams?.toString() ?? '');
		params.set('page', page.toString());
		navigate(`${location.pathname}?${params.toString()}`, { replace: true });
	};

	return (
		<TablePagination page={currentPage} onChangePage={navigateToPage} limit={limit} total={total} />
	);
};
