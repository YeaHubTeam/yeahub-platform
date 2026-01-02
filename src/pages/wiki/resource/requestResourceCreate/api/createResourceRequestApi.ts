import { ApiTags, baseApi, i18n, Translation } from '@/shared/config';
import { handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createResourceRequestApiUrls } from '../lib/constants/createResourceRequestConstants';
import { getCreateResourceRequestApiErrorMessage } from '../lib/utils/getCreateResourceRequestApiErrorMessage';
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
				async onQueryStarted(_, { queryFulfilled }) {
					try {
						await queryFulfilled;
						toast.success(i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_SUCCESS));
					} catch (error) {
						toast.error(i18n.t(handleApiError(error, getCreateResourceRequestApiErrorMessage)));
						// eslint-disable-next-line no-console
						console.error(error);
					}
				},
				invalidatesTags: [ApiTags.RESOURCES_MY_REQUESTS],
			},
		),
	}),
});

export const { useCreateResourceRequestMutation } = createResourceRequestApi;
