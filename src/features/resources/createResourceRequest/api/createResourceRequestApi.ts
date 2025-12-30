import { ApiTags, baseApi } from '@/shared/config';

import { createResourceRequestApiUrls } from '../model/constants/createResourceRequestConstants';
import {
	CreateResourceBodyRequest,
	CreateResourceRequestResponse,
} from '../model/types/resourceRequestCreateTypes';

export const createResourceRequestApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createResourceRequest: build.mutation<CreateResourceRequestResponse, CreateResourceBodyRequest>(
			{
				query: (resource) => ({
					url: createResourceRequestApiUrls.createResourceRequest,
					method: 'POST',
					body: resource,
				}),
				invalidatesTags: [ApiTags.RESOURCES_MY_REQUESTS],
			},
		),
	}),
});

export const { useCreateResourceRequestMutation } = createResourceRequestApi;
