import { i18n, Translation } from '@/shared/config';

import { EditCollectionsError } from '../../model/types/collectionEditTypes';

export const getEditCollectionsApiErrorMessage = (error: ApiErrorData<EditCollectionsError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_AUTH_USER_VERIFIED);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_TINIFY_COMPRESS_FAILED);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_TINIFY_RESIZE_FAILED);
		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_AUTH_ROLES_AUTHOR_CAN_CHANGE_ONLY_OWN);
		case 'collection.collection.not_found':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_COLLECTION_NOT_FOUND);
		case 'collection.collection.update_conflict':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_COLLECTION_UPDATE_CONFLICT);
		case 'storage.image.too_large':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_STORAGE_IMAGE_TOO_LARGE);
		case 'storage.image.invalid_format':
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_STORAGE_IMAGE_INVALID_FORMAT);
		default:
			return i18n.t(Translation.TOAST_COLLECTION_EDIT_FAILED);
	}
};
