import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { Collection } from '@/entities/collection';

import { deleteCollectionApiUrls } from '../model/constants/deleteCollectionConstants';

const deleteCollectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteCollection: build.mutation<void, Collection['id']>({
			query: (collectionId) => ({
				url: route(deleteCollectionApiUrls.deleteCollection, collectionId),
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.COLLECTIONS, ApiTags.COLLECTION_DETAIL],
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_COLLECTION_DELETE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.questions.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_COLLECTION_DELETE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useDeleteCollectionMutation } = deleteCollectionApi;
