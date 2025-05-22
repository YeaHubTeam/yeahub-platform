import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { removeFromLS } from '@/shared/helpers/manageLocalStorage';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { deleteAccountApiUrls } from '../model/constants';
import { DeleteAccountPayload } from '../model/types/deleteAccount';

const deleteAccountApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteAccount: build.mutation<void, DeleteAccountPayload>({
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
						toast.success(i18n.t(Translation.TOAST_ADMIN_DELETE_ACCOUNT_SUCCESS));
					} else {
						removeFromLS(LS_ACCESS_TOKEN_KEY);
						dispatch(baseApi.util.resetApiState());
						typedExtra.navigate(ROUTES.auth.register.page);
						toast.success(i18n.t(Translation.TOAST_DELETE_ACCOUNT_SUCCESS));
					}
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_DELETE_ACCOUNT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useDeleteAccountMutation } = deleteAccountApi;
