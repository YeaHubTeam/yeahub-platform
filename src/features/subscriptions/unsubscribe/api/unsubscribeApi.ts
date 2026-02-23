import { ApiTags, baseApi, i18n, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { unsubscribeApiUrls } from '../model/constants/unsubscribeConstants';
import { UnsubscribeParams } from '../model/types/types';

const unsubscribeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		unsubscribe: build.mutation<void, UnsubscribeParams>({
			query: (body) => ({
				url: route(unsubscribeApiUrls.unsubscribeUser),
				method: 'DELETE',
				body,
			}),
			invalidatesTags: [
				ApiTags.PROFILE,
				ApiTags.ROLES,
				ApiTags.USER_DETAIL,
				ApiTags.SUBSCRIPTIONS_USER,
			],
			async onQueryStarted() {
				try {
					toast.success(i18n.t(Translation.TOAST_SUBSCRIPTIONS_UNSUBSCRIBE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_SUBSCRIPTIONS_UNSUBSCRIBE_FAILED));
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
	}),
});

export const { useUnsubscribeMutation } = unsubscribeApi;
