import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { toast } from '@/shared/ui/Toast';

import { TelegramLoginBodyRequest, TelegramLoginResponse } from '@/entities/auth';

import { linkTelegramApiUrls } from '../model/constants/telegramLinkConstants';

export const telegramLinkApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		linkTelegramAccount: build.mutation<TelegramLoginResponse, TelegramLoginBodyRequest>({
			query: (body) => ({
				url: linkTelegramApiUrls.linkTelegram,
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_AUTH_TELEGRAM_VERIFICATION_LINK_SUCCESS));
					dispatch(baseApi.util.invalidateTags([ApiTags.PROFILE]));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_VERIFICATION_LINK_ERROR));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
	overrideExisting: false,
});

export const { useLinkTelegramAccountMutation } = telegramLinkApi;
