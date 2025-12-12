import { i18n, Translation } from '@/shared/config';

import type { ResourceCreateError } from '@/entities/resource';

export const getCreateResourceApiErrorMessage = (error: ApiErrorData<ResourceCreateError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_UNVERIFIED);
		case 'externalproducts.skill.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_SKILL_NOT_FOUND);
		case 'externalproducts.specialization.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_SPECIALIZATION_NOT_FOUND);
		case 'externalproducts.resource_type.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_TYPE_NOT_FOUND);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_IMAGE_COMPRESS_FAILED);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_IMAGE_RESIZE_FAILED);
		default:
			return i18n.t(Translation.TOAST_RESOURCE_CREATE_FAILED);
	}
};
