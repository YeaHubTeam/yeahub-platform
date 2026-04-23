import { http, HttpResponse } from 'msw';

import { referralLinksMock } from '@/entities/referralLink';

import { deleteReferralLinkApiUrls } from '../../model/constants/deleteReferralLinkApiUrls';

let mockLinks = [...referralLinksMock.data];

export const deleteReferralLinkMock = [
	http.delete(
		`${process.env.API_URL}${deleteReferralLinkApiUrls.deleteReferralLink}/:id`,
		({ params }) => {
			const { id } = params;
			const isFound = mockLinks.some((link) => link.id === id);

			if (!isFound) {
				return HttpResponse.json({ message: 'Not found' }, { status: 404 });
			}

			mockLinks = mockLinks.filter((link) => link.id !== id);

			return new HttpResponse(null, { status: 200 });
		},
	),
];
