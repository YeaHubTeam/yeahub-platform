import { i18n, Translation } from '@/shared/config';

import { CreateFeatureFlagError } from '../../model/types/featureFlagCreateTypes';

export const getCreateFeatureFlagApiErrorMessage = (
	error: ApiErrorData<CreateFeatureFlagError>,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_CREATE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_CREATE_AUTH_USER_VERIFIED);
		case 'feature-flag.feature-flag.already_exists':
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_CREATE_ALREADY_EXISTS);
		default:
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_CREATE_FAILED);
	}
};
