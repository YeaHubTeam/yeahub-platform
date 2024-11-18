import { baseApi } from '@/shared/config/api/baseApi';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { handleRequestToast } from '@/shared/helpers/handleRequestToast';

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
				const onSuccess = async () => {
					await queryFulfilled;
				};
				handleRequestToast({
					onSuccess,
					successMessage: Translation.TOAST_CHANGE_PASSWORD_SUCCESS,
					failedMessage: Translation.TOAST_CHANGE_PASSWORD_FAILED,
				});
			},
		}),
	}),
});
export const { useChangePasswordMutation } = changePasswordApi;
