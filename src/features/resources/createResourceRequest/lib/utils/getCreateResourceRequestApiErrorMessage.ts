import { i18n, Translation } from '@/shared/config';

import type { ResourceRequestCreateError } from '@/entities/resource';

export const getCreateResourceRequestApiErrorMessage = (
	error: ApiErrorData<ResourceRequestCreateError>,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_UNVERIFIED);
		case 'externalproducts.skill.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_SKILL_NOT_FOUND);
		case 'externalproducts.specialization.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_SPECIALIZATION_NOT_FOUND);
		case 'externalproducts.resource_type.not_found':
			return i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_TYPE_NOT_FOUND);
		default:
			return i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_FAILED);
	}
};
