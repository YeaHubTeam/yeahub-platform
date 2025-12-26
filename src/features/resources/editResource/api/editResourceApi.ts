import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

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
					toast.error(i18n.t(Translation.TOAST_RESOURCE_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(e);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES, ApiTags.RESOURCES_DETAIL],
		}),
	}),
});

export const { useEditResourceMutation } = editResourceApi;
