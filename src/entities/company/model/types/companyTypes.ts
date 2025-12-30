import { Response } from '@/shared/libs';

export interface Company {
	id: string | number;
	title?: string;
	legalName?: string | null;
	description?: string | null;
	imageSrc?: string | null;
	inn?: string | null;
	kpp?: string | null;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: { id: string; username: string };
}

export type GetCompanyByIdResponse = Company;

export type GetCompanyByIdRequest = {
	companyId: string;
};

export type CreateOrEditCompanyFormValues = Omit<Company, 'createdAt' | 'updatedAt' | 'createdBy'>;

export type GetCompaniesListResponse = Response<Company[]>;

export interface GetCompaniesListParamsRequest {
	limit?: number;
	page?: number;
	titleOrLegalNameOrDescriptionSearch?: string;
}
