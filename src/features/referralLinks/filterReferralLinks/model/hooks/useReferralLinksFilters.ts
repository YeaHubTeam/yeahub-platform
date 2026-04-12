import { useQueryFilterParams } from '@/shared/libs';

import { ReferralLinksFilterParams } from '@/entities/referralLink';

import { useGetReferralLinksFilterParams } from './useGetReferralLinksFilterParams';

export const useReferralLinksFilters = (initialParams: ReferralLinksFilterParams) => {
	const currentParams = useGetReferralLinksFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } =
		useQueryFilterParams<ReferralLinksFilterParams>(initialParams, currentParams);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.ownerId) ||
		Boolean(filters.title) ||
		filters.isMy ||
		Boolean(filters.orderBy) ||
		Boolean(filters.order);

	const onChangePage = (page: ReferralLinksFilterParams['page']) => {
		onFilterChange({ page });
	};
	const onChangeTitle = (title: ReferralLinksFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};
	const onChangeIsMy = (isMy: ReferralLinksFilterParams['isMy']) => {
		onFilterChange({
			isMy,
			page: 1,
			ownerId: undefined,
		});
	};
	const onChangeOwner = (ownerId?: ReferralLinksFilterParams['ownerId']) => {
		onFilterChange({ ownerId, page: 1 });
	};
	const onChangeOrderBy = (orderBy: ReferralLinksFilterParams['orderBy']) => {
		onFilterChange({ orderBy, page: 1 });
	};
	const onChangeOrder = (order: ReferralLinksFilterParams['order']) => {
		onFilterChange({ order, page: 1 });
	};
	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeTitle,
		onChangeIsMy,
		onChangeOwner,
		onChangeOrderBy,
		onChangeOrder,
	};
};
