import { http, HttpResponse, DefaultBodyType } from 'msw';

import { companiesMock } from '@/entities/company';
import type { Company } from '@/entities/company';

import { createCompanyApiUrls } from '../../model/constants/createCompanyConstants';
import type {
	CreateCompanyBodyRequest,
	CreateCompanyResponse,
} from '../../model/types/companyCreateTypes';

export const createCompanyMock = http.post<
	CreateCompanyBodyRequest,
	DefaultBodyType,
	CreateCompanyResponse
>(createCompanyApiUrls.createCompany, async ({ request }) => {
	const body = (await request.json()) as CreateCompanyBodyRequest;

	const newId = crypto.randomUUID();

	const newCompany: Company = {
		id: newId,
		title: body.title,
		legalName: body.legalName,
		description: body.description,
		imageSrc: body.imageSrc ?? '',
		inn: body.inn,
		kpp: body.kpp,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		createdBy: { id: '1', username: 'admin' },
	};

	companiesMock.data.push(newCompany);
	companiesMock.total += 1;

	return HttpResponse.json(newCompany);
});
