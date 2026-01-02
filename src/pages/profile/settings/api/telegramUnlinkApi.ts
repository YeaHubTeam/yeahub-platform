import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { toast } from '@/shared/ui/Toast';

import { telegramUnlinkApiUrls } from '../lib/constants/telegramUnlinkConstants';
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
