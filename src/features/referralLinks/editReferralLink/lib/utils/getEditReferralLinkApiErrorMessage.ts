import { i18n, Translation } from '@/shared/config';

import type { EditReferralLinkError } from '../../model/types/referralEditPageTypes';

export const getEditReferralLinkApiErrorMessage = (error: ApiErrorData<EditReferralLinkError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_REFERRALLINK_EDIT_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_REFERRALLINK_EDIT_AUTH_USER_VERIFIED);
		case 'referral.user.not_owner':
			return i18n.t(Translation.TOAST_REFERRALLINK_EDIT_REFERRAL_USER_NOT_OWNER);
		case 'referral.link.not_find':
			return i18n.t(Translation.TOAST_REFERRALLINK_EDIT_REFERRAL_LINK_NOT_FIND);
		default: {
			return i18n.t(Translation.TOAST_REFERRALLINK_EDIT_FAILED);
		}
	}
};
