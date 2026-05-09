import { ReferralLinksFilterParams } from '@/entities/referralLink';

export const useGetReferralLinksFilterParams = (initialParams: ReferralLinksFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: ReferralLinksFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
	};

	return currentParams;
};
