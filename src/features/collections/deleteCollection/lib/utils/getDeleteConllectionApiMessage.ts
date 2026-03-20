import { i18n, Translation } from '@/shared/config';

import { DeleteCollectionError } from '../../model/types/deleteCollectionTypes';

export const getDeleteConllectionApiErrorMessage = (error: ApiErrorData<DeleteCollectionError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_AUTH_USER_VERIFIED);
		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_AUTH_ROLES_AUTHOR_CAN_CHANGE_ONLY_OWN);
		case 'collection.collection.not_found':
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_SINGLE_NOTFOUND);
		case 'collection.collection.constraint.foreign_key_violation':
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_CONSTRAINT_KEY_VIOLATION);
		case 'storage.image.url.invalid':
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_SINGLE_IMAGE_URL_INVALID);
		case 'storage.image.not_found':
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_SINGLE_IMAGE_NOT_FOUND);
		default:
			return i18n.t(Translation.TOAST_COLLECTION_DELETE_FAILED);
	}
};
