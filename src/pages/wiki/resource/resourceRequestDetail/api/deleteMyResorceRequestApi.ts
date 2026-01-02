import { ApiTags, baseApi, ROUTES, i18n, Translation, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteMyResourceRequestApiUrls } from '../lib/constants/DeleteRequestApiUrls';

const deleteMyResourceRequestApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		deleteMyResourceRequest: builder.mutation<void, string>({
			query: (requestId) => ({
				url: route(deleteMyResourceRequestApiUrls.deleteMyResourceRequest, requestId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_RESOURCE_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.wiki.resources.my.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES_MY_REQUESTS],
		}),
	}),
});

export const { useDeleteMyResourceRequestMutation } = deleteMyResourceRequestApi;
