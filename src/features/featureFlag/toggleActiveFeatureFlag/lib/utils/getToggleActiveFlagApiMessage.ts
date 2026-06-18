import { i18n, Translation } from '@/shared/config';

import { ToggleActiveFeatureFlagError } from '../../model/types/toggleActiveFeatureFlagTypes';

export const getToggleActiveFeatureFlagApiErrorMessage = (
	error: ApiErrorData<ToggleActiveFeatureFlagError>,
	enabled: boolean,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_AUTH_USER_VERIFIED);

		case 'feature-flag.feature-flag.not_found':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_SINGLE_NOTFOUND);

		case 'feature-flag.feature-flag.already_exists':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_UPDATE_SINGLE_ALREADY_EXISTS);

		default:
			return i18n.t(
				enabled
					? Translation.TOAST_FEATURE_FLAG_UPDATE_SINGLE_DISABLED_FAILED
					: Translation.TOAST_FEATURE_FLAG_UPDATE_SINGLE_ENABLED_FAILED,
			);
	}
};
