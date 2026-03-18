import { CreateOrEditOrViewReferralLinkFormValues, ReferralLink } from '@/entities/referralLink';

export type ReferralLinkCreateError = 'auth.auth.unauthorized' | 'auth.user.verified';
export type CreateRefferalLinkFormValues = Omit<CreateOrEditOrViewReferralLinkFormValues, 'id'>;

export type CreateRefferalLinkBodyRequest = CreateRefferalLinkFormValues;
export type CreateRefferalLinkResponse = ReferralLink;
