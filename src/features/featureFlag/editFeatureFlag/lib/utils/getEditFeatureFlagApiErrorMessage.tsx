import { i18n, Translation } from '@/shared/config';

import { EditFeatureFlagError } from '../../model/types/featureFlagEditTypes';

export const getEditFeatureFlagApiErrorMessage = (error: ApiErrorData<EditFeatureFlagError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_EDIT_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_EDIT_AUTH_USER_VERIFIED);
		case 'feature-flag.feature-flag.already_exists':
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_EDIT_ALREADY_EXISTS);
		case 'feature-flag.feature-flag.not_found':
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_EDIT_NOT_FOUND);
		default:
			return i18n.t(Translation.TOAST_FEATURE_FLAGS_EDIT_FAILED);
	}
};
