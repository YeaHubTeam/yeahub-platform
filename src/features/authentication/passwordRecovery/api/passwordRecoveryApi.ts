import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { setToLS } from '@/shared/helpers/manageLocalStorage';
import { toast } from '@/shared/ui/Toast';

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
				try {
					const result = await queryFulfilled;
					setToLS(LS_ACCESS_TOKEN_KEY, result.data.access_token);
					toast.success(i18n.t(Translation.TOAST_SUCCESSFULLY_CHANGE_PASSWORD));

					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.platformRoute);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_ERROR_CHANGE_PASSWORD));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useResetPasswordMutation } = passwordRecoveryApi;
