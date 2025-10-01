import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { toast } from '@/shared/ui/Toast';

import { linkTelegramApiUrls } from '../model/constants/telegramLinkConstants';
import { TelegramLoginBodyRequest, TelegramLoginResponse } from '../model/types/telegramLinkTypes';

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
					toast.success(i18n.t(Profile.TELEGRAM_VERIFICATION_TOAST_TELEGRAM_LINK_SUCCESS));
					dispatch(baseApi.util.invalidateTags([ApiTags.PROFILE]));
				} catch (error) {
					toast.error(i18n.t(Profile.TELEGRAM_VERIFICATION_TOAST_TELEGRAM_LINK_ERROR));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
	overrideExisting: false,
});

export const { useLinkTelegramAccountMutation } = telegramLinkApi;
