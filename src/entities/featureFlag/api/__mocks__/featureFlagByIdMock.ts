import { DefaultBodyType, http, HttpResponse } from 'msw';

import { featureFlagApiUrls } from '../../model/constants/featureFlags';
import { GetFeatureFlagByIdResponse } from '../../model/types/featureFlag';

import { featureFlagsMock } from './data/featureFlagsMock';

export const featureFlagByIdMock = http.get<
	{ flagId: string },
	DefaultBodyType,
	GetFeatureFlagByIdResponse
>(`${process.env.API_URL}${featureFlagApiUrls.getFeatureFlagById}`, ({ params }) => {
	const { flagId } = params;
	const featureFlag = featureFlagsMock.data.find((f) => String(f.id) === flagId);

	return HttpResponse.json(featureFlag);
});
