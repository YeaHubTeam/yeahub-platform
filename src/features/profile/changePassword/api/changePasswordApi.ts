import { i18n, Translation, baseApi } from '@/shared/config';
import { toast } from '@/shared/ui/Toast';

import { ChangePasswordRequest } from '../model/types/changePasswordTypes';

export const changePasswordApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		changePassword: build.mutation<void, ChangePasswordRequest>({
			query: ({ id, passwordObject }) => ({
				url: `auth/password-change/${id}`,
				method: 'PATCH',
				body: passwordObject,
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_CHANGE_PASSWORD_SUCCESS));
				} catch (err) {
					toast.error(i18n.t(Translation.TOAST_CHANGE_PASSWORD_FAILED));
					// eslint-disable-next-line no-console
					console.log(err);
				}
			},
		}),
	}),
});
export const { useChangePasswordMutation } = changePasswordApi;
