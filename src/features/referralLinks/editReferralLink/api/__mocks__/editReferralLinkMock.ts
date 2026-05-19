import { http, HttpResponse } from 'msw';

import { referralLinksMock } from '@/entities/referralLink';

import type { EditReferralLinkBodyRequest } from '@/features/referralLinks/editReferralLink/model/types/referralEditPageTypes';

import { editReferralLinkApiUrls } from '../../model/constants/editReferralLinkApiUrls';

export const editReferralLinkMock = http.put(
	`${process.env.API_URL}${editReferralLinkApiUrls.editReferralLink}`,
	async ({ params, request }) => {
		const { referralId } = params;
		const body = (await request.json()) as EditReferralLinkBodyRequest;

		const index = referralLinksMock.data.findIndex((link) => link.id === referralId);

		if (index === -1) {
			return HttpResponse.json({ message: 'Referral link not found' }, { status: 404 });
		}

		referralLinksMock.data[index] = {
			...referralLinksMock.data[index],
			...body,
			updatedAt: new Date().toISOString(),
		};

		return HttpResponse.json(referralLinksMock.data[index], { status: 200 });
	},
);
