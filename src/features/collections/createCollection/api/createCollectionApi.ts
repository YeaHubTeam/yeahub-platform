import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createCollectionApiUrls } from '../model/constants/createCollectionConstants';
import {
	CreateCollectionBodyRequest,
	CreateCollectionResponse,
} from '../model/types/collectionCreateTypes';

export const createCollectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createCollection: build.mutation<CreateCollectionResponse, CreateCollectionBodyRequest>({
			query: (collection) => ({
				url: createCollectionApiUrls.createCollection,
				method: 'POST',
				body: collection,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.collections.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_COLLECTION_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_COLLECTION_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.COLLECTIONS],
		}),
	}),
});

export const { useCreateCollectionMutation } = createCollectionApi;
