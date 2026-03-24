import { i18n, Translation } from '@/shared/config';

import { ReferralLinkDeleteError } from '../../model/types/deleteReferralLinkTypes';

export const getDeleteReferralLinkApiErrorMessage = (
	error: ApiErrorData<ReferralLinkDeleteError>,
) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_REFERRALLINK_DELETE_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_REFERRALLINK_DELETE_UNVERIFIED);
		case 'referral.user.not_owner':
			return i18n.t(Translation.TOAST_REFERRALLINK_DELETE_NOT_OWNER);
		case 'referral.link.not_find':
			return i18n.t(Translation.TOAST_REFERRALLINK_DELETE_NOT_FOUND);
		default:
			return i18n.t(Translation.TOAST_REFERRALLINK_DELETE_FAILED);
	}
};
