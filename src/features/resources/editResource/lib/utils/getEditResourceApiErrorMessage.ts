import { i18n, Translation } from '@/shared/config';

import type { ResourceEditError } from '@/entities/resource';

export const getEditResourceApiErrorMessage = (error: ApiErrorData<ResourceEditError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_UNVERIFIED);

		case 'externalproducts.catalog.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_CATALOG_NOT_FOUND);

		case 'externalproducts.resource_type.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_TYPE_NOT_FOUND);

		case 'externalproducts.skill.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_SKILL_NOT_FOUND);

		case 'externalproducts.specialization.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_SPECIALIZATION_NOT_FOUND);

		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_COMPRESS_FAILED);

		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_RESIZE_FAILED);

		default:
			return i18n.t(Translation.TOAST_RESOURCE_EDIT_FAILED);
	}
};
