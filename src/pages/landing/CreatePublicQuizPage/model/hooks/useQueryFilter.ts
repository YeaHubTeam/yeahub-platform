import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DEFAULT_SPECIALIZATION_NUMBER } from '@/shared/constants/queryConstants';

import { QuestionModeType } from '@/entities/quiz';

interface FilterFromURL {
	specialization: string | null;
	category: string | null;
	count: string | null;
	complexity: string | null;
	mode: string | null;
}

interface FilterFromUser {
	specialization?: number[];
	skills?: number[];
	category?: number[];
	count?: number;
	complexity?: number[];
	mode?: QuestionModeType;
}

export const useQueryFilter = () => {
	const [filter, setFilter] = useState<FilterFromUser>({});
	const navigate = useNavigate();
	const location = useLocation();
	const initialQuery: FilterFromUser = {
		count: 1,
		specialization: [DEFAULT_SPECIALIZATION_NUMBER],
	};

	const getQueryParams = (): FilterFromURL => {
		const params = new URLSearchParams(location.search);
		return {
			specialization: params.get('specialization'),
			category: params.get('category'),
			count: params.get('count'),
			complexity: params.get('complexity'),
			mode: params.get('mode'),
		};
	};

	const parseFilters = (params: FilterFromURL): FilterFromUser => {
		return {
			specialization: params.specialization
				? params.specialization.split(',').map(Number)
				: undefined,
			category: params.category ? params.category.split(',').map(Number) : undefined,
			count: params.count ? Number(params.count) : undefined,
			complexity: params.complexity ? params.complexity.split(',').map(Number) : undefined,
			mode: params.mode ? (params.mode as QuestionModeType) : undefined,
		};
	};

	const updateQueryParams = (newFilters: FilterFromUser) => {
		const params = new URLSearchParams(location.search);

		Object.entries(newFilters).forEach(([key, value]) => {
			if (value === null || value === undefined) {
				params.delete(key);
				return;
			}
			const stringValue = Array.isArray(value) ? value.join(',') : value.toString();
			params.set(key, stringValue);
		});

		const updatedQueryParams = `?${params.toString()}`;
		if (location.search !== updatedQueryParams) {
			navigate(updatedQueryParams);
		}
	};

	useEffect(() => {
		const queryParams = getQueryParams();
		if (!queryParams.count || !queryParams.specialization) {
			updateQueryParams(initialQuery);
		}
	}, [location.search]);

	useEffect(() => {
		const queryParams = getQueryParams();
		const parsedFilter = parseFilters(queryParams);
		setFilter((prevFilter) =>
			JSON.stringify(prevFilter) === JSON.stringify(parsedFilter) ? prevFilter : parsedFilter,
		);
	}, [location.search]);

	const handleFilterChange = (newFilters: FilterFromUser) => {
		setFilter((prevFilter) => {
			const updatedFilters = { ...prevFilter, ...newFilters };
			updateQueryParams(updatedFilters);
			return updatedFilters;
		});
	};

	return { filter, handleFilterChange };
};
