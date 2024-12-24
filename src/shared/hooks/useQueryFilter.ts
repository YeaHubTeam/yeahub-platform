import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type QuestionFilterStatus = 'all' | 'learned' | 'not-learned';

interface FilterFromURL {
	skills: string | null;
	rate: string | null;
	complexity: string | null;
	status: string | null;
	title: string | null;
	page: string | null;
	orderBy?: string | null;
	order?: string | null;
	specialization?: string | null;
}

interface FilterFromUser {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	title?: string;
	status?: QuestionFilterStatus;
	page?: number;
	orderBy?: string;
	order?: string;
	specialization?: number[];
}

const initialState = '?page=1&status=all';

export const useQueryFilter = () => {
	const [filter, setFilters] = useState<FilterFromUser>({} as FilterFromUser);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (!params.get('page') && !params.get('status')) {
			navigate(initialState);
		}
	}, []);

	const getQueryParams = (): FilterFromURL => {
		const params = new URLSearchParams(location.search);

		return {
			page: params.get('page'),
			skills: params.get('skills'),
			rate: params.get('rate'),
			complexity: params.get('complexity'),
			status: params.get('status'),
			title: params.get('title'),
			orderBy: params.get('orderBy'),
			order: params.get('order'),
			specialization: params.get('specialization'),
		};
	};

	const parseFilters = (params: FilterFromURL): FilterFromUser => {
		return {
			skills: params.skills ? params.skills.split(',').map(Number) : undefined,
			complexity: params.complexity ? params.complexity.split(',').map(Number) : undefined,
			rate: params.rate ? params.rate.split(',').map(Number) : undefined,
			title: params.title ? params.title : undefined,
			status: params.status ? (params.status as QuestionFilterStatus) : 'all',
			page: params.page ? Number(params.page) : undefined,
			orderBy: params.orderBy ? params.orderBy : undefined,
			order: params.order ? params.order : undefined,
			specialization: params.specialization
				? params.specialization.split(',').map(Number)
				: undefined,
		};
	};

	const updateQueryParams = (newFilters: FilterFromUser) => {
		const params = new URLSearchParams(location.search);

		Object.keys(newFilters).forEach((key) => {
			const curFilter = newFilters[key as keyof FilterFromUser];

			if (curFilter !== undefined && curFilter !== null) {
				if (key === 'page' && Number(newFilters.page) === Number(params.get('page'))) {
					params.set(key, '1');
					return;
				}

				if (key === 'status' && newFilters.status === params.get('page')) {
					params.set(key, 'all');
					return;
				}

				if (Array.isArray(curFilter)) {
					params.set(key, curFilter.join(','));
				} else {
					params.set(key, curFilter.toString());
				}
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

	const resetFilters = () => {
		setFilters({} as FilterFromUser);
		navigate(initialState);
	};

	return { filter, handleFilterChange, resetFilters };
};
