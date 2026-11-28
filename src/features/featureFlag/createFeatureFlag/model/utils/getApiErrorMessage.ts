import { Translation, i18n } from '@/shared/config';

import { CreateFeatureFlagError } from '../types/featureFlagCreateTypes';

export const getCreateFeatureFlagErrorMessage = (error: ApiErrorData<CreateFeatureFlagError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_FORBIDDEN);

		case 'feature-flag.feature-flag.already_exists':
			return i18n.t(Translation.TOAST_FEATURE_FLAG_ALREADY_EXISTS);

		default:
			return i18n.t(Translation.TOAST_FEATURE_FLAG_CREATE_ERROR);
	}
};
