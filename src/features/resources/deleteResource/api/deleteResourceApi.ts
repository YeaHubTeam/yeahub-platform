import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { Resource } from '@/entities/resource';

import { deleteResourceApiUrls } from '../model/constants/deleteResourceConstants';

const deleteResourceApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		deleteResource: builder.mutation<void, Resource['id']>({
			query: (resourceId) => ({
				url: route(deleteResourceApiUrls.deleteResource, resourceId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_RESOURCE_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.resources.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES, ApiTags.RESOURCES_DETAIL],
		}),
	}),
});

export const { useDeleteResourceMutation } = deleteResourceApi;
