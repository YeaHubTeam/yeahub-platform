import { http, HttpResponse } from 'msw';

import { referralLinksMock } from '@/entities/referralLink';

import { deleteReferralLinkApiUrls } from '../../model/constants/deleteReferralLinkApiUrls';

export const deleteReferralLinkMock = http.delete(
	`${process.env.API_URL}${deleteReferralLinkApiUrls.deleteReferralLink}`,
	({ params }) => {
		const { linkId } = params;
		const isFound = referralLinksMock.data.some((link) => link.id === linkId);

		if (!isFound) {
			return HttpResponse.json({ message: 'Not found' }, { status: 404 });
		}

		referralLinksMock.data = referralLinksMock.data.filter((link) => link.id !== linkId);
		referralLinksMock.total = referralLinksMock.total - 1;
		return new HttpResponse(null, { status: 200 });
	},
);
