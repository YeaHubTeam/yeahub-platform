import { http, HttpResponse, DefaultBodyType } from 'msw';

import { companiesMock } from '@/entities/company';
import type { Company } from '@/entities/company';

type CreateCompanyRequest = {
	title: string;
	legalName: string;
	description: string;
	imageSrc?: string;
	inn: string;
	kpp: string;
	companyImage?: string;
};

export const createCompanyMock = http.post<CreateCompanyRequest, DefaultBodyType, Company>(
	'/companies',
	async ({ request }) => {
		const body = (await request.json()) as CreateCompanyRequest;

		const newId = Math.max(...companiesMock.data.map((c) => Number(c.id) || 0)) + 1;

		const newCompany: Company = {
			id: newId,
			title: body.title,
			legalName: body.legalName,
			description: body.description,
			imageSrc: body.imageSrc ?? null,
			inn: body.inn,
			kpp: body.kpp,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			createdBy: { id: '1', username: 'admin' },
		};

		companiesMock.data.unshift(newCompany);

		return HttpResponse.json(newCompany);
	},
);
