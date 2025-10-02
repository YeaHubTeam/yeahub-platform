import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { DeleteRequestApiUrls } from '../model/constants/DeleteRequestApiUrls';

const deleteRequestApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		deleteRequest: builder.mutation<void, string>({
			query: (requestId) => ({
				url: route(DeleteRequestApiUrls.deleteRequest, requestId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_RESOURCE_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.resources.requests.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.RESOURCE_REQUESTS],
		}),
	}),
});

export const { useDeleteRequestMutation } = deleteRequestApi;
