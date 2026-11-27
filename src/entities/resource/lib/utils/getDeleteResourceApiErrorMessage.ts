import { i18n, Translation } from '@/shared/config';

export const getDeleteResourceApiErrorMessage = (message?: string) => {
	switch (message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_RESOURCES_DELETE_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_RESOURCES_DELETE_AUTH_USER_VERIFIED);

		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_RESOURCES_DELETE_AUTH_ROLES_AUTHOR_CAN_CHANGE_ONLY_OWN);

		case 'externalproducts.catalog.not_found':
			return i18n.t(Translation.TOAST_RESOURCES_DELETE_CATALOG_NOT_FOUND);

		default:
			return i18n.t(Translation.TOAST_RESOURCES_DELETE_SINGLE_FAILED);
	}
};
