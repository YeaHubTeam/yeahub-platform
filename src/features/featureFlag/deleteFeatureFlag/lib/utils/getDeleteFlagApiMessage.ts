import { i18n, Translation } from '@/shared/config';

import { DeleteFeatureFlagError } from '../../model/types/deleteFeatureFlagTypes';

export const getDeleteFeatureFlagApiErrorMessage = (
	error: ApiErrorData<DeleteFeatureFlagError>,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_AUTH_USER_VERIFIED);

		case 'feature-flag.feature-flag.not_found':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_SINGLE_NOTFOUND);

		default:
			return i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_SINGLE_FAILED);
	}
};
