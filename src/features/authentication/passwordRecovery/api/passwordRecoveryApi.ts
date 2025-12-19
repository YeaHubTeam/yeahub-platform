import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { LS_ACCESS_TOKEN_KEY, setToLS } from '@/shared/libs';
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
					typedExtra.navigate(ROUTES.interview.page);
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
