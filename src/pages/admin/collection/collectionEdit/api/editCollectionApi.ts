import { ApiTags, baseApi, ROUTES, i18n, Translation, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { editCollectionApiUrls } from '../lib/constants/editCollectionConstants';
import {
	EditCollectionBodyRequest,
	EditCollectionResponse,
} from '../model/types/collectionEditTypes';

const editCollectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editCollection: build.mutation<EditCollectionResponse, EditCollectionBodyRequest>({
			query: (collection) => ({
				url: route(editCollectionApiUrls.editCollection, collection.id),
				method: 'PATCH',
				body: collection,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.admin.collections.page);
					toast.success(i18n.t(Translation.TOAST_COLLECTION_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_COLLECTION_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.COLLECTIONS],
		}),
	}),
});

export const { useEditCollectionMutation } = editCollectionApi;
