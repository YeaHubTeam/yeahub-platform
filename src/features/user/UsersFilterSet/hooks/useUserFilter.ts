import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface FilterFromURL {
	isEmailVerified: string | null;
	roles: string | null;
	page: string | null;
}

interface FilterFromUser {
	isEmailVerified?: boolean | null;
	roles?: number[];
	page?: number;
}

const initialState = '?page=1&limit=10';

export const useUserFilter = () => {
	const [filter, setFilters] = useState<FilterFromUser>({} as FilterFromUser);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (!params.get('page') && !params.get('isEmailVerified') && !params.get('roles')) {
			navigate(initialState);
		}
	}, []);

	const getQueryParams = (): FilterFromURL => {
		const params = new URLSearchParams(location.search);

		return {
			page: params.get('page'),
			isEmailVerified: params.get('isEmailVerified'),
			roles: params.get('roles'),
		};
	};

	const parseFilters = (params: FilterFromURL): FilterFromUser => {
		const filters: FilterFromUser = {};

		if (params.isEmailVerified === 'true') {
			filters.isEmailVerified = true;
		} else if (params.isEmailVerified === 'false') {
			filters.isEmailVerified = false;
		}

		if (params.roles) {
			filters.roles = params.roles.split(',').map(Number);
		}

		if (params.page) {
			filters.page = Number(params.page);
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

		navigate(`?${params.toString()}`);
	};

	useEffect(() => {
		setFilters(parseFilters(getQueryParams()));
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
