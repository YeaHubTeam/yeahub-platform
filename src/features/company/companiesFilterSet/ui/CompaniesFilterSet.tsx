import { useQueryFilter } from '@/shared/hooks';

import { SortCompaniesByField } from '@/entities/company';

export const CompaniesFilterSet = () => {
	const {
		filter: { orderBy },
		handleFilterChange,
	} = useQueryFilter();

	const changeSortBy = (orderBy: string) => {
		handleFilterChange({ orderBy });
	};

	return <SortCompaniesByField changeSortBy={changeSortBy} selectedOrderBy={orderBy} />;
};
