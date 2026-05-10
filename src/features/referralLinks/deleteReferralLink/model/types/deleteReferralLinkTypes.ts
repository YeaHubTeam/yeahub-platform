export type ReferralLinkDeleteError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'referral.user.not_owner'
	| 'referral.link.not_find';

export type DeleteReferralLinkRequest = string;

export type DeleteReferralLinkResponse = void;
