export interface Referral {
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

export type GetReferralsListParamsRequest = {
	page?: number;
	limit?: number;
};
export type GetReferralsListResponse = {
	data: Referral[];
	total: number;
};

export type GetReferralByIdParamsRequest = {
	referralId: string;
};
export type GetReferralByIdResponse = Referral;
