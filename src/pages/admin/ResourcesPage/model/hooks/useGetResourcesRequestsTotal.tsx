import { useGetResourceRequestsQuery } from '@/entities/resource';

export const useGetRecourcesRequestsTotal = () => {
	const { data, isLoading } = useGetResourceRequestsQuery({ page: 1, limit: 1 });
	return { data: data?.total ?? 0, isLoading };
};
