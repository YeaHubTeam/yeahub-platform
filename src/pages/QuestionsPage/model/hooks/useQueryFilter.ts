import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { QuestionFilterStatus } from '@/widgets/Question';

interface FilterFromURL {
	skills: string | null;
	rate: string | null;
	complexity: string | null;
	status: string | null;
	title: string | null;
	page: string | null;
}

interface FilterFromUser {
	skills?: number[];
	complexity?: number[];
	rate?: number[];
	title?: string;
	status?: QuestionFilterStatus;
	page?: number;
}

export const useQueryFilter = () => {
	const [filter, setFilters] = useState<FilterFromUser>({} as FilterFromUser);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (!params.get('page') && !params.get('status')) {
			navigate(`?page=1&status=all`);
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
		};
	};

	const updateQueryParams = (newFilters: FilterFromUser) => {
		const params = new URLSearchParams(location.search);

		Object.keys(newFilters).forEach((key) => {
			const curFilter = newFilters[key as keyof FilterFromUser];

			if (curFilter !== undefined && curFilter !== null) {
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

	return { filter, handleFilterChange };
};
