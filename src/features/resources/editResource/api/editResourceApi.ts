import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
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
