import { Response, SortOrder } from '@/shared/libs';

export interface ReferralLink {
	id: string;
	ownerId: string;
	ownerUsername: string;
	refCode: string;
	url: string;
	linkedCount: number;
	amountSum: number;
	createdAt: string;
	updatedAt: string;
}

export type GetReferralLinksListParamsRequest = {
	page?: number;
	limit?: number;
	search?: string;
	ownerId?: string;
	sortBy?: string;
	sortOrder?: SortOrder;
};

export type GetReferralLinksListResponse = Response<ReferralLink[]>;

export type CreateOrEditOrViewReferralLinkFormValues = Pick<
	ReferralLink,
	'id' | 'refCode' | 'url' | 'ownerId'
>;

export type ReferralLinkCreateError = 'auth.auth.unauthorized' | 'auth.user.verified';
