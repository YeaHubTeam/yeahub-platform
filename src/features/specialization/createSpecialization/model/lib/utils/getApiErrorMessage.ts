import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CreateSpecializationsError } from '../../types/specializationCreateTypes';

export const getSpecializationsErrorMessage = (error: ApiErrorData<CreateSpecializationsError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_SPECEIALIZATIONS_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_SPECIALIZATIONS_AUTH_USER_VERIFIED);
		case 'specialization.user.not_found':
			return i18n.t(Translation.TOAST_SPECIALIZATION_USER_NOT_FOUND);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_SPECIALIZATION_TINIFY_COMPRESS_FAILED);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_SPECIALIZATION_TINIFY_RESIZE_FAILED);
		default:
			return i18n.t(Translation.TOAST_AUTH_TELEGRAM_VERIFICATION_LINK_ERROR);
	}
};
