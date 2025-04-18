export interface ICompany {
	id: number;
	title: string;
	legalName?: string;
	description?: string;
	imageSrc?: string | null;
	inn?: string;
	kpp?: string;
	createdAt?: string;
	updatedAt?: string;
}

export type GetCompanyByIdResponse = ICompany;

export type GetCompanyByIdRequest = {
	companyId: number;
};

export interface GetCompaniesListParamsRequest {
	limit?: number;
	titleOrLegalNameOrDescriptionSearch?: string;
	status?: string;
}

export interface GetCompaniesListResponse {
	data: ICompany[];
	page: number;
	limit: number;
	total: number;
}
