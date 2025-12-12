import { Translation, i18n } from '@/shared/config';

import { CreateSpecializationError } from '../types/specializationCreateTypes';

export const getCreateSpecializationErrorMessage = (
	error: ApiErrorData<CreateSpecializationError>,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_SPECIALIZATION_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_SPECIALIZATION_AUTH_USER_VERIFIED);
		case 'specialization.user.not_found':
			return i18n.t(Translation.TOAST_SPECIALIZATION_USER_NOT_FOUND);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_SPECIALIZATION_TINIFY_COMPRESS_FAILED);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_SPECIALIZATION_TINIFY_RESIZE_FAILED);
		case 'specialization.specialization.title.conflict':
			return i18n.t(Translation.TOAST_SPECIALIZATION_TITLE_CONFLICT);
		default:
			return i18n.t(Translation.ERROR);
	}
};
