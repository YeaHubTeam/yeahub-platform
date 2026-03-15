import { CreateOrEditOrViewReferralLinkFormValues, ReferralLink } from '@/entities/referralLink';

export type CreateRefferalLinkFormValues = Omit<CreateOrEditOrViewReferralLinkFormValues, 'id'>;

export type CreateRefferalLinkBodyRequest = CreateRefferalLinkFormValues;
export type CreateRefferalLinkResponse = ReferralLink;
