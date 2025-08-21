import { Response } from '@/shared/types/types';

export interface Company {
	id: string | number;
	title?: string;
	legalName?: string;
	description?: string;
	imageSrc?: string | null;
	inn?: string;
	kpp?: string;
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
	status?: string;
	inn?: string;
	kpp?: string;
}
