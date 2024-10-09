import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { QuestionModeType } from '@/entities/quiz';

interface FilterFromURL {
	category: string | null;
	count: string | null;
	complexity: string | null;
	mode: string | null;
}

interface FilterFromUser {
	category?: number[];
	count?: number;
	complexity?: number[];
	mode?: QuestionModeType;
}

export const useQueryFilter = () => {
	const [filter, setFilters] = useState<FilterFromUser>({});

	const navigate = useNavigate();
	const location = useLocation();

	const getQueryParams = (): FilterFromURL => {
		const params = new URLSearchParams(location.search);

		return {
			category: params.get('category'),
			count: params.get('count'),
			complexity: params.get('complexity'),
			mode: params.get('mode'),
		};
	};

	const parseFilters = (params: FilterFromURL): FilterFromUser => {
		return {
			category: params.category ? params.category.split(',').map(Number) : undefined,
			count: params.count ? Number(params.count) : undefined,
			complexity: params.complexity ? params.complexity.split(',').map(Number) : undefined,
			mode: params.mode ? (params.mode as QuestionModeType) : undefined,
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
