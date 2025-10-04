import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { toast } from '@/shared/ui/Toast';

import { telegramUnlinkApiUrls } from '../model/constants/telegramUnlinkConstants';
import { TelegramUnlinkResponse } from '../model/types/telegramUnlinkTypes';

export const telegramUnlinkApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		telegramUnlink: build.mutation<TelegramUnlinkResponse, void>({
			query: () => ({
				url: telegramUnlinkApiUrls.telegramUnlink,
				method: 'POST',
			}),
			invalidatesTags: [ApiTags.PROFILE],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_USER_VERIFICATION_TELEGRAM_UNLINK_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_USER_VERIFICATION_TELEGRAM_UNLINK_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useTelegramUnlinkMutation } = telegramUnlinkApi;
