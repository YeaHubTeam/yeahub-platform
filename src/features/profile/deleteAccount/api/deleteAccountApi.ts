import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route, LS_ACCESS_TOKEN_KEY, removeFromLS } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteAccountApiUrls } from '../model/constants';
import { DeleteAccountParams } from '../model/types/deleteAccount';

const deleteAccountApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteAccount: build.mutation<void, DeleteAccountParams>({
			query: ({ userId }) => ({
				url: route(deleteAccountApiUrls.deleteAccount, userId),
				method: 'DELETE',
			}),
			async onQueryStarted({ isAdmin }, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					if (isAdmin) {
						typedExtra.navigate(ROUTES.admin.users.page);
						toast.success(i18n.t(Translation.TOAST_USER_DELETE_ADMIN_SUCCESS));
					} else {
						removeFromLS(LS_ACCESS_TOKEN_KEY);
						dispatch(baseApi.util.resetApiState());
						typedExtra.navigate(ROUTES.auth.register.page);
						toast.success(i18n.t(Translation.TOAST_DELETE_ACCOUNT_SUCCESS));
					}
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_USER_DELETE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.USERS],
		}),
	}),
});

export const { useDeleteAccountMutation } = deleteAccountApi;
