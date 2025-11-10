import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
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
					switch (error) {
						case 'auth.auth.unauthorized':
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_UNAUTHORIZED));
							break;
						case 'auth.telegram.invalid_data':
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_INVALID_DATA));
							break;
						case 'auth.telegram.data_outdated':
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_DATA_OUTDATED));
							break;

						case 'user.telegram.already_linked':
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_ALREADY_LINKED));
							break;
						case 'user.telegram.linked_to_another_user':
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_LINKED_TO_ANOTHER_USER));
							break;
						case 'auth.telegram.verify_denied':
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_VERIFY_DENIED));
							break;

						case 'user.user.id.not_found':
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_USER_NOT_FOUND));
							break;

						default:
							toast.error(i18n.t(Translation.TOAST_AUTH_TELEGRAM_VERIFICATION_LINK_ERROR));
					}
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
	overrideExisting: false,
});

export const { useLinkTelegramAccountMutation } = telegramLinkApi;
