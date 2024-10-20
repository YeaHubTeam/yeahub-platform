import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const params = Object.fromEntries(searchParams);

	const setQueryParams = (newParams: Record<string, string | number>) => {
		Object.entries(newParams).forEach(([name, value]) => {
			if (value !== undefined) {
				searchParams.set(name, String(value));
			}
		});
		setSearchParams(`?${searchParams.toString()}`);
	};

	return {
		params,
		setQueryParams,
	};
};
