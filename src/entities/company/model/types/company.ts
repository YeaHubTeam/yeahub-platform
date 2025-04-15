export interface Company {
	id: string;
	title: string;
	legalName?: string;
	description?: string;
	imageSrc?: string | null;
	inn?: string;
	kpp?: string;
	createdAt?: string;
	updatedAt?: string;
}

export type GetCompanyByIdResponse = Company;

export type GetCompanyByIdRequest = {
	companyId: string;
};
