import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryFilterParams = <T extends { page?: number }>(initialParams: T) => {
	const [filter, setFilters] = useState<T>(initialParams as T);
	const navigate = useNavigate();
	const location = useLocation();

	const getInitialParams = () => {
		const params = new URLSearchParams();

		Object.entries(initialParams).forEach(([param, value]) => {
			const newParam = Array.isArray(value) ? value.join(',') : value.toString();

			params.set(param, newParam);
		});

		return `?${params.toString()}`;
	};

	const getUpdateQueryParams = (newFilters: T): string => {
		const params = new URLSearchParams(location.search);

		Object.keys(newFilters).forEach((key) => {
			const curFilter = newFilters[key as keyof T];

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

		return `?${params.toString()}`;
	};

	const onFilterChange = (newFilters: T) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters, ...newFilters };
			navigate(getUpdateQueryParams(updatedFilters));
			return updatedFilters;
		});
	};

	const onResetFilters = () => {
		setFilters(initialParams as T);
		navigate(getInitialParams(), { replace: true });
	};

	useEffect(() => {
		navigate(getInitialParams(), { replace: true });
	}, []);

	return { filter, onFilterChange, onResetFilters };
};
