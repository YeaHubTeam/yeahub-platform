import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
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
