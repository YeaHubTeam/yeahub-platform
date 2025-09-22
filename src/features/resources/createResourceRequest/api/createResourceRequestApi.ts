import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { createResourceRequestApiUrls } from '../model/constants/createResourceRequestConstants';
import {
	CreateResourceBodyRequest,
	CreateResourceRequestResponse,
} from '../model/types/resourceRequestCreateTypes';

export const createResourceRequestApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createResourceRequest: build.mutation<
			CreateResourceRequestResponse,
			{ resource: CreateResourceBodyRequest }
		>({
			query: ({ resource }) => ({
				url: createResourceRequestApiUrls.createResourceRequest,
				method: 'POST',
				body: resource,
			}),
			invalidatesTags: [ApiTags.RESOURCES_MY_REQUESTS],
		}),
	}),
});

export const { useCreateResourceRequestMutation } = createResourceRequestApi;
