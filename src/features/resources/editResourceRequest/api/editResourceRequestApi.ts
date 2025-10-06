import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
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
				} catch (e) {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(e);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES_MY_REQUESTS, ApiTags.RESOURCE_REQUEST_DETAIL],
		}),
	}),
});

export const { useEditResourceRequestMutation } = editResourceRequestApi;
