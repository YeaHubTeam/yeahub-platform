import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import type { ResourceEditError } from '@/entities/resource';

import { getEditResourceApiErrorMessage } from '../lib/utils/getEditResourceApiErrorMessage';
import { editResourceByIdUrl } from '../model/constants/editResourceConstants';
import { EditResourceBodyRequest, EditResourceResponse } from '../model/types/resourcesEditTypes';

export const editResourceApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editResource: build.mutation<EditResourceResponse, EditResourceBodyRequest>({
			query: (resource) => ({
				url: route(editResourceByIdUrl.editResource, resource.id),
				method: 'PUT',
				body: resource,
			}),
			async onQueryStarted(_arg, { queryFulfilled, extra }) {
				try {
					const res = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					typedExtra.navigate(route(ROUTES.admin.resources.details.page, res.data.id));
					toast.success(i18n.t(Translation.TOAST_RESOURCE_EDIT_SUCCESS));
				} catch (e) {
					toast.error(handleApiError<ResourceEditError>(e, getEditResourceApiErrorMessage));
					// eslint-disable-next-line no-console
					console.error(e);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES, ApiTags.RESOURCES_DETAIL],
		}),
	}),
});

export const { useEditResourceMutation } = editResourceApi;
