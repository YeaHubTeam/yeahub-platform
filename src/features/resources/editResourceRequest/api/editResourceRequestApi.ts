import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { toast } from '@/shared/ui/Toast';

import { editResourceRequestApiUrls } from '../model/constants/editResourceRequestConstants';
import {
	EditResourceBodyRequest,
	EditResourceRequestResponse,
} from '../model/types/resourceRequestEditTypes';

export const editResourceRequestApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editResourceRequest: build.mutation<EditResourceRequestResponse, EditResourceBodyRequest>({
			query: (resource) => ({
				url: editResourceRequestApiUrls.editResourceRequest,
				method: 'PATCH',
				body: resource,
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES_MY_REQUESTS, ApiTags.RESOURCE_REQUEST],
		}),
	}),
});

export const { useEditResourceRequestMutation } = editResourceRequestApi;
