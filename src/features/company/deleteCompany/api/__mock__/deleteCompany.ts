import { http, HttpResponse } from 'msw';

import { companiesMock } from '@/entities/company';

import { deleteCompanyApiUrls } from '../../model/constants/deleteCompanyConstants';
export const deleteCompanyMock = http.delete<{ companyId: string }, { message: string }>(
	`${process.env.API_URL}${deleteCompanyApiUrls.deleteCompany}`,
	({ params }) => {
		const { companyId } = params;

		const foundCompany = companiesMock.data.findIndex((company) => company.id === companyId);
		if (foundCompany == -1) {
			return HttpResponse.json({ message: 'Company is not found' }, { status: 404 });
		}
		companiesMock.data = companiesMock.data.filter((company) => company.id !== companyId);
		companiesMock.total = companiesMock.total - 1;

		return HttpResponse.json({ message: 'Company was deleted' }, { status: 200 });
	},
);
