import { ReferralLink } from '@/entities/referralLink';

export type EditReferralLinkFormValues = ReferralLink

export type EditReferralLinkBodyRequest = ReferralLink
export type EditReferralLinkResponse = ReferralLink

export type EditReferralLinkError =
  | 'auth.auth.unauthorized'
  | 'auth.user.verified'
  | 'referral.user.not_owner'
  | 'referral.link.not_find'

