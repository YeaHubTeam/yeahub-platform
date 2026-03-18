import { i18n, Translation } from '@/shared/config';

import { deleteCompanyError } from '../../model/types/deleteCompanyTypes';

export const getDeleteCompanyApiErrorMessage = (error: ApiErrorData<deleteCompanyError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_AUTH_USER_VERIFIED);
		case 'storage.image.url.invalid':
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_IMAGE_URL_INVALID);
		case 'storage.image.not_found':
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_IMAGE_NOT_FOUND);
		case 'company.company.not_found':
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_NOT_FOUND);
		case 'company.collection.constraint.foreign_key_violation':
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_COLLECTION_FOREIGN_KEY_VIOLATION);
		case 'company.company.constraint.foreign_key_violation':
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_COMPANY_FOREIGN_KEY_VIOLATION);
		default:
			return i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_FAILED);
	}
};
