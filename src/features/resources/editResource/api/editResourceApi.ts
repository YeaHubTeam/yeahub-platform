import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { productByIdUrl } from '../model/constants/editResourceConstants';
import type {
	UpdateResourceBodyRequest,
	ResourceEditResponse,
} from '../model/types/resourcesEditTypes';

type GetArgs = { id: string | number };
type UpdateArgs = { id: string | number; resource: UpdateResourceBodyRequest };

export const editResourceApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getResourceById: build.query<ResourceEditResponse, GetArgs>({
			query: ({ id }) => ({ url: productByIdUrl(id), method: 'GET' }),
			providesTags: (_res, _err, { id }) => [{ type: ApiTags.RESOURCES, id }],
		}),

		updateResource: build.mutation<ResourceEditResponse, UpdateArgs>({
			query: ({ id, resource }) => ({
				url: productByIdUrl(id),
				method: 'PUT',
				body: resource,
			}),
			async onQueryStarted(_arg, { queryFulfilled, extra }) {
				try {
					const res = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					typedExtra.navigate(route(ROUTES.admin.resources.details.page, res.data.id));
					toast.success(
						i18n.t(Translation.TOAST_RESOURCE_EDIT_SUCCESS, {
							defaultValue: 'Updated successfully',
						}),
					);
				} catch (e) {
					toast.error(
						i18n.t(Translation.TOAST_RESOURCE_EDIT_FAILED, { defaultValue: 'Update failed' }),
					);
					// eslint-disable-next-line no-console
					console.error(e);
				}
			},
			invalidatesTags: (_res, _err, { id }) => [
				{ type: ApiTags.RESOURCES },
				{ type: ApiTags.RESOURCES, id },
			],
		}),
	}),
});

export const { useGetResourceByIdQuery, useUpdateResourceMutation } = editResourceApi;
