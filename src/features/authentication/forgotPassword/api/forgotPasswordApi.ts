import { baseApi } from '@/shared/config';

import { SendEmailRecoveryPasswordParams } from '../model/types/forgotPasswordTypes';

export const forgotPasswordApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		sendEmailRecoveryPassword: build.mutation<void, SendEmailRecoveryPasswordParams>({
			query: ({ email }) => `auth/send-reset-password?email=${email}`,
		}),
	}),
});

export const { useSendEmailRecoveryPasswordMutation } = forgotPasswordApi;
