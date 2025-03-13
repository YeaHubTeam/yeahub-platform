import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
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
