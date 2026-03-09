import { http, HttpResponse, DefaultBodyType } from 'msw';

import { companiesMock } from '@/entities/company';
import type { Company } from '@/entities/company';

import type { CreateCompanyBodyRequest } from '@/features/company/createCompany';

import { createCompanyApiUrls } from '../../model/constants/createCompanyConstants';

export const createCompanyMock = http.post<CreateCompanyBodyRequest, DefaultBodyType, Company>(
	createCompanyApiUrls.createCompany,
	async ({ request }) => {
		const body = (await request.json()) as CreateCompanyBodyRequest;

		const newId = crypto.randomUUID();

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

		companiesMock.data.push(newCompany);

		return HttpResponse.json(newCompany);
	},
);
