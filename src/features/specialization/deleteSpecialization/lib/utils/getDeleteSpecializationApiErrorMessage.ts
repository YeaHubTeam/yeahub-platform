import { i18n, Translation } from '@/shared/config';

import type { DeleteSpecializationError } from '../../model/types/deleteSpecializationTypes';

export const getDeleteSpecializationApiErrorMessage = (
	error: ApiErrorData<DeleteSpecializationError>,
) => {
	switch (error.message) {
		case 'storage.image.url.invalid':
			return i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_STORAGE_IMAGE_URL_INVALID);
		case 'storage.image.not_found':
			return i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_STORAGE_IMAGE_NOT_FOUND);
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_USER_VERIFIED);
		case 'specialization.specialization.not_found':
			return i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_SPECIALIZATION_NOT_FOUND);
		case 'specialization.specialization.constraint.foreign_key_violation':
			return i18n.t(
				Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_SPECIALIZATION_CONSTRAINT_FOREIGN_KEY_VIOLATION,
			);
		case 'specialization.question.constraint.foreign_key_violation':
			return i18n.t(
				Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_QUESTION_CONSTRAINT_FOREIGN_KEY_VIOLATION,
			);
		case 'specialization.collection.constraint.foreign_key_violation':
			return i18n.t(
				Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_COLLECTION_CONSTRAINT_FOREIGN_KEY_VIOLATION,
			);
		default: {
			return i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_FAILED);
		}
	}
};
