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
			{ resource: CreateResourceBodyRequest; isUser: boolean | undefined }
		>({
			query: ({ resource, isUser }) => ({
				url: isUser
					? createResourceRequestApiUrls.createResourceRequest
					: createResourceRequestApiUrls.createResourceAdmin,
				method: 'POST',
				body: resource,
			}),
			invalidatesTags: [ApiTags.RESOURCES],
		}),
	}),
});

export const { useCreateResourceRequestMutation } = createResourceRequestApi;
