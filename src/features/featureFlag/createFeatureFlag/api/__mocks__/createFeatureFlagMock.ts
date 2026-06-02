import { http, HttpResponse } from 'msw';

import { RoleName } from '@/entities/auth';
import { featureFlagsMock } from '@/entities/featureFlag';
import { userRolesMock } from '@/entities/user';

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

	const roleIdToName = userRolesMock.reduce(
		(acc, role) => {
			acc[role.id] = role.name;
			return acc;
		},
		{} as Record<number, string>,
	);

	const newFlag: CreateFeatureFlagResponse = {
		id: crypto.randomUUID(),
		flag: body.flag,
		description: body.description,
		enabled: body.enabled ?? false,
		roles: body.roleIds.map((id) => roleIdToName[id]) as RoleName[],
		clientType: body.clientType,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	featureFlagsMock.data.push(newFlag);
	featureFlagsMock.total += 1;

	return HttpResponse.json(newFlag, { status: 201 });
});
