import { DefaultBodyType, http, HttpResponse } from 'msw';

import { featureFlagApiUrls } from '../../model/constants/featureFlags';
import {
	GetFeatureFlagsListParamsRequest,
	GetFeatureFlagsListResponse,
} from '../../model/types/featureFlag';

import { featureFlagsMock } from './data/featureFlagsMock';

export const featureFlagsListMock = http.get<
	Record<keyof GetFeatureFlagsListParamsRequest, string>,
	DefaultBodyType,
	GetFeatureFlagsListResponse
>(`${process.env.API_URL}${featureFlagApiUrls.getFeatureFlagsList}`, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);
	const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
	const enabledParam = url.searchParams.get('enabled');

	let data = featureFlagsMock.data;

	if (enabledParam !== null) {
		const enabled = enabledParam === 'true';
		data = data.filter((flag) => flag.enabled === enabled);
	}

	if (search) {
		data = data.filter((flag) =>
			[flag.flag, flag.description, flag.id].join(' ').toLowerCase().includes(search),
		);
	}

	const total = data.length;
	const paged = data.slice((page - 1) * limit, page * limit);

	return HttpResponse.json({
		data: paged,
		page,
		total,
		limit,
	});
});
