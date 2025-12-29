import { i18n, Translation } from '@/shared/config';

import type { TelegramLoginError } from '@/entities/auth';

export const getTelegramLinkApiErrorMessage = (error: ApiErrorData<TelegramLoginError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_UNAUTHORIZED);
		case 'auth.telegram.invalid_data':
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_INVALID_DATA);
		case 'auth.telegram.data_outdated':
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_DATA_OUTDATED);
		case 'user.telegram.already_linked':
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_ALREADY_LINKED);
		case 'user.telegram.linked_to_another_user':
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_LINKED_TO_ANOTHER_USER);
		case 'auth.telegram.verify_denied':
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_VERIFY_DENIED);
		case 'user.user.id.not_found':
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_USER_NOT_FOUND);
		default:
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_VERIFICATION_LINK_ERROR);
	}
};
