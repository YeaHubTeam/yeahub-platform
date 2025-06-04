import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DEFAULT_SPECIALIZATION_NUMBER } from '../constants/queryConstants';

type QuestionFilterStatus = 'all' | 'learned' | 'not-learned' | 'favorite';

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
	isFree?: string | null;
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
	specialization?: number | number[];
	isFree?: boolean;
}

const initialState = `?page=1&status=all&specialization=${DEFAULT_SPECIALIZATION_NUMBER}`;

export const useQueryFilter = (onReset?: () => void) => {
	const [filter, setFilters] = useState<FilterFromUser>({} as FilterFromUser);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const page = params.get('page');
		const status = params.get('status');
		const specialization = params.get('specialization');

		const shouldRedirect =
			location.pathname !== '/admin/companies' && (!page || !status || !specialization);

		if (shouldRedirect) {
			navigate(initialState, { replace: true });
		}
	}, [location.pathname, location.search]);

	useEffect(() => {
		setFilters(parseFilters(getQueryParams()));
	}, [location.search]);

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
			isFree: params.get('isFree'),
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
			isFree: params.isFree === 'true' ? true : params.isFree === 'false' ? false : undefined,
		};
	};

	const updateQueryParams = (newFilters: FilterFromUser) => {
		const params = new URLSearchParams(location.search);

		Object.keys(newFilters).forEach((key) => {
			const curFilter = newFilters[key as keyof FilterFromUser];

			if (curFilter !== undefined && curFilter !== null) {
				if (key === 'tariff') {
					params.set('isFree', curFilter.toString());
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

	const handleFilterChange = (newFilters: FilterFromUser) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters, ...newFilters };
			updateQueryParams(updatedFilters);
			return updatedFilters;
		});
	};

	const resetFilters = () => {
		setFilters({} as FilterFromUser);
		if (location.pathname === '/admin/companies') {
			onReset?.();
			return;
		}
		navigate(initialState, { replace: true });
	};

	return { filter, handleFilterChange, resetFilters };
};
