import { useGetResourceRequestsQuery } from '@/entities/resource';

export const useGetResourcesRequestsTotal = () => {
	const { data, isLoading } = useGetResourceRequestsQuery({ page: 1, limit: 1 });
	return { total: data?.total ?? 0, isLoading };
};
