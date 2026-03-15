/* eslint-disable prettier/prettier */
import { i18n, Translation } from '@/shared/config';

import { ReferralLinkCreateError } from '@/entities/referralLink';

export const getCreateReferralLinkApiErrorMessage = (
	error: ApiErrorData<ReferralLinkCreateError>,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_REFERRALLINK_CREATE_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_REFERRALLINK_CREATE_UNVERIFIED);
		default:
			return i18n.t(Translation.TOAST_REFERRALLINK_CREATE_FAILED);
	}
};
