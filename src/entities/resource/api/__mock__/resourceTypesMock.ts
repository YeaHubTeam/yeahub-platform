import { http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import type { GetResourceTypesResponse } from '../../model/types/resource';

import { resourceTypes } from './data/resourceTypes';

export const resourceTypesMock = http.get<never, never, GetResourceTypesResponse>(
	`${process.env.API_URL}${resourceApiUrls.getResourceTypes}`,
	() => {
		return HttpResponse.json(resourceTypes);
	},
);
