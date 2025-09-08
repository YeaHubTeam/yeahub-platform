import { DefaultBodyType, http, HttpResponse } from 'msw';

import { companyApiUrls } from '../../model/constants/companyConstants';
import { GetCompanyByIdRequest, GetCompanyByIdResponse } from '../../model/types/companyTypes';

import { companiesMock } from './data';

export const companyByIdMock = http.get<
	Record<keyof GetCompanyByIdRequest, string>,
	DefaultBodyType,
	GetCompanyByIdResponse
>(`${process.env.API_URL}${companyApiUrls.getCompanyById}`, ({ params }) => {
	const { companyId } = params;
	const company = companiesMock.data.find((c) => String(c.id) === companyId);

	return HttpResponse.json(company);
});
