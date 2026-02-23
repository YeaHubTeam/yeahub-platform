import { i18n, Translation } from '@/shared/config';

import { CreateCollectionsError } from '../../model/types/collectionCreateTypes';

export const getCreateCollectionsApiErrorMessage = (
	error: ApiErrorData<CreateCollectionsError>,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_AUTH_USER_VERIFIED);
		case 'auth.roles.admin_or_author_required':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_AUTH_ROLES_ADMIN_OR_AUTHOR_REQUIRED);
		case 'user.user.id.not_found':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_USER_ID_NOT_FOUND);
		case 'collection.user.deleted':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_COLLECTION_USER_DELETED);
		case 'collection.collection.create_conflict':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_COLLECTION_CREATE_CONFLICT);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_TINIFY_COMPRESS_FAILED);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_COLLECTIONS_CREATE_TINIFY_RESIZE_FAILED);
		default:
			return i18n.t(Translation.TOAST_COLLECTION_CREATE_FAILED);
	}
};
