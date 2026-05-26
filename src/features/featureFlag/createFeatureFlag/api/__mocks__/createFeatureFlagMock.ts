import { http, HttpResponse } from 'msw';

import { ROLE_ID_TO_NAME } from '@/entities/auth';
import { featureFlagsMock } from '@/entities/featureFlag';

import { createFeatureFlagApiUrls } from '../../model/constants/createFeatureFlagConstants';
import {
	CreateFeatureFlagBodyRequest,
	CreateFeatureFlagResponse,
} from '../../model/types/featureFlagCreateTypes';

export const createFeatureFlagMock = http.post<
	Record<string, never>,
	CreateFeatureFlagBodyRequest,
	CreateFeatureFlagResponse
>(createFeatureFlagApiUrls.createFeatureFlag, async ({ request }) => {
	const body = await request.json();

	const newFlag = {
		id: crypto.randomUUID(),
		flag: body?.flag,
		description: body?.description,
		enabled: body?.enabled ?? false,
		roles: body.roleIds?.map((id) => ROLE_ID_TO_NAME[id]),
		clientType: body.clientType,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	featureFlagsMock.data.push(newFlag);
	featureFlagsMock.total += 1;

	return HttpResponse.json(newFlag);
});
