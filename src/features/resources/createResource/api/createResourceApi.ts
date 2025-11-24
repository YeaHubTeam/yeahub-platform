import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { createResourceApiUrls } from '../model/constants/createResourceConstants';
import {
	CreateResourceBodyRequest,
	CreateResourceResponse,
} from '../model/types/resourceCreateTypes';

export const createResourceApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createResource: build.mutation<
			CreateResourceResponse,
			{ resource: CreateResourceBodyRequest; isAdmin: boolean | undefined }
		>({
			query: ({ resource, isAdmin }) => ({
				url: isAdmin
					? createResourceApiUrls.createResourceAdmin
					: createResourceApiUrls.createResourceRequest,
				method: 'POST',
				body: resource,
			}),
			async onQueryStarted(arg, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					if (arg.isAdmin) {
						typedExtra.navigate(route(ROUTES.admin.resources.details.page, result.data.id));
						toast.success(i18n.t(Translation.TOAST_RESOURCE_CREATE_SUCCESS));
					} else {
						typedExtra.navigate(ROUTES.wiki.resources.my.page);
						toast.success(i18n.t(Translation.TOAST_RESOURCE_REQUEST_SUCCESS));
						// TODO: implement a modal for resource moderation, delete the toast!
						// typedExtra.openResourceModerationModal?.(result.data);
					}
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES],
		}),
	}),
});

export const { useCreateResourceMutation } = createResourceApi;
