import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { editCollectionApiUrls } from '../model/constants/editCollectionConstants';
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
