import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createResourceApiUrls } from '../lib/constants/createResourceConstants';
import { getCreateResourceApiErrorMessage } from '../lib/utils/getCreateResourceApiErrorMessage';
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
						toast.success(i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_SUCCESS));
						// TODO: implement a modal for resource moderation, delete the toast!
						// typedExtra.openResourceModerationModal?.(result.data);
					}
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getCreateResourceApiErrorMessage)));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.RESOURCES],
		}),
	}),
});

export const { useCreateResourceMutation } = createResourceApi;
