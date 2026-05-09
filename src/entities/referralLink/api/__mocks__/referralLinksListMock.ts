import { DefaultBodyType, http, HttpResponse } from 'msw';

import { referralLinksApiUrls } from '../../model/constants/referralLinksConstants';
import { GetReferralLinksListResponse } from '../../model/types/referralLinks';

import { referralLinksMock } from './data';

export const referralLinksListMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetReferralLinksListResponse
>(process.env.API_URL + referralLinksApiUrls.getReferralLinksList, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = 10;

	const paginationData = referralLinksMock.data.slice(
		(Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	return HttpResponse.json({
		data: paginationData,
		page: Number(page),
		total: referralLinksMock.total,
		limit: referralLinksMock.limit,
	});
});
