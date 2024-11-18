import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { handleRequestToast } from '@/shared/helpers/handleRequestToast';
import { setToLS } from '@/shared/helpers/manageLocalStorage';

import { ExtraArgument } from '@/entities/auth';

import { ResetPasswordParams, ResetPasswordResponse } from '../model/types/passwordRecoveryTypes';

export const passwordRecoveryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordParams>({
			query: (body) => ({
				url: '/auth/reset-password',
				method: 'PATCH',
				body: { ...body },
			}),
			invalidatesTags: [ApiTags.PROFILE],
			async onQueryStarted(_, { queryFulfilled, extra }) {
				const onSuccess = async () => {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.platformRoute);
				};
				handleRequestToast({
					onSuccess,
					successMessage: Translation.TOAST_SUCCESSFULLY_CHANGE_PASSWORD,
					failedMessage: Translation.TOAST_ERROR_CHANGE_PASSWORD,
				});
			},
		}),
	}),
});

export const { useResetPasswordMutation } = passwordRecoveryApi;
