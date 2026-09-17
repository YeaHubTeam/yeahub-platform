import { http, HttpResponse } from 'msw';

import { createReferralLinkApiUrls } from '../../model/constants/createReferralLinkApiUrls';
import {
	CreateRefferalLinkBodyRequest,
	CreateRefferalLinkResponse,
} from '../../model/types/refferalLinkCreateTypes';

export const createReferralLinkMock = http.post<
	Record<string, never>,
	CreateRefferalLinkBodyRequest,
	CreateRefferalLinkResponse
>(`${process.env.API_URL}${createReferralLinkApiUrls.createReferralLink}`, () => {
	const referralLink: CreateRefferalLinkResponse = {
		id: 'mock-referral-link-id',
		ownerId: 'mock-owner-id',
		ownerUsername: 'mock-user',
		refCode: '',
		url: '',
		linkedCount: 0,
		amountSum: 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	return HttpResponse.json(referralLink, { status: 201 });
});
