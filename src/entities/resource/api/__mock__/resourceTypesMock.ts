import { http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import type { GetResourceTypesResponse } from '../../model/types/resource';

import { resourcesMock } from './data/resourcesMock';

export const resourceTypesMock = http.get<never, never, GetResourceTypesResponse>(
	`${process.env.API_URL}${resourceApiUrls.getResourceTypes}`,
	() => {
		const uniqueTypes = Array.from(
			new Map(resourcesMock.map((r) => [r.type.code, r.type])).values(),
		);
		return HttpResponse.json(uniqueTypes);
	},
);
