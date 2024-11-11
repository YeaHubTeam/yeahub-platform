import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { toast } from '@/shared/ui/Toast';

import { profileActions } from '@/entities/profile';

import { SendVerificationEmailParams, SendVerificationEmailResponse } from '../model/types';

const SECONDS_30_IN_MS = 30 * 1000;

export const confirmEmailApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		sendVerificationEmail: build.mutation<
			SendVerificationEmailResponse,
			SendVerificationEmailParams
		>({
			query: ({ id }) => `/auth/send-verification-email/${id}`,
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(profileActions.setEmailSent(true));

					const timer = setTimeout(() => {
						dispatch(profileActions.setEmailSent(false));
						clearTimeout(timer);
					}, SECONDS_30_IN_MS);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_SETTINGS_SEND_VERIFICATION_EMAIL_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useSendVerificationEmailMutation } = confirmEmailApi;
