import { i18n, Translation } from '@/shared/config';

import { CreateCompanyError } from '../../model/types/companyCreateTypes';

export const getCreateCompanyApiErrorMessage = (error: ApiErrorData<CreateCompanyError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_COMPANIES_CREATE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_COMPANIES_CREATE_AUTH_USER_VERIFIED);
		case 'company.user.not_found':
			return i18n.t(Translation.TOAST_COMPANIES_CREATE_USER_NOT_FOUND);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_COMPANIES_CREATE_TINIFY_COMPRESS_FAILED);
		case 'company.company.create_conflict':
			return i18n.t(Translation.TOAST_COMPANIES_CREATE_CONFLICT);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_COMPANIES_CREATE_TINIFY_RESIZE_FAILED);
		default:
			return i18n.t(Translation.TOAST_COMPANIES_CREATE_FAILED);
	}
};
