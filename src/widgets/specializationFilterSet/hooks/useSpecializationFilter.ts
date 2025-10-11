import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface FilterFromURL {
	authorId: string | null;
	page: string | null;
}

interface FilterFromUser {
	authorId?: string;
	page?: number;
}

const initialState = '?page=1&limit=10';

export const useSpecializationFilter = () => {
	const [filter, setFilters] = useState<FilterFromUser>({} as FilterFromUser);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (!params.get('page') && !params.get('authorId')) {
			navigate(initialState, { replace: true });
		}
	}, []);

	const getQueryParams = (): FilterFromURL => {
		const params = new URLSearchParams(location.search);
		return {
			page: params.get('page'),
			authorId: params.get('authorId'),
		};
	};

	const parseFilters = (params: FilterFromURL): FilterFromUser => {
		const filters: FilterFromUser = {};

		if (params.authorId) {
			filters.authorId = params.authorId;
		}

		const page = Number(params.page);
		if (params.page && !isNaN(page)) {
			filters.page = page;
		}

		return filters;
	};

	const updateQueryParams = (newFilters: FilterFromUser) => {
		const params = new URLSearchParams(location.search);

		Object.keys(newFilters).forEach((key) => {
			const curFilter = newFilters[key as keyof FilterFromUser];
			if (curFilter !== undefined && curFilter !== null) {
				params.set(key, curFilter.toString());
			} else {
				params.delete(key);
			}
		});

		navigate(`?${params.toString()}`, { replace: true });
	};

	useEffect(() => {
		const newFilter = parseFilters(getQueryParams());
		setFilters((prev) => {
			if (JSON.stringify(prev) !== JSON.stringify(newFilter)) {
				return newFilter;
			}
			return prev;
		});
	}, [location.search]);

	const handleFilterChange = (newFilters: FilterFromUser) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters, ...newFilters };
			updateQueryParams(updatedFilters);
			return updatedFilters;
		});
	};

	return { filter, handleFilterChange };
};
