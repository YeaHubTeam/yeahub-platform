import { CreateOrEditCompanyFormValues, Company } from '@/entities/company';

export type CompanyEditFormValues = Omit<
	CreateOrEditCompanyFormValues,
	'imageSrc' | 'legalName' | 'description' | 'inn' | 'kpp'
> & {
	imageSrc: string | null;
	companyImage: string | null;
	legalName?: string | null;
	description?: string | null;
	inn?: string | null;
	kpp?: string | null;
};

export type CompanyEditBodyRequest = Omit<CompanyEditFormValues, 'imageSrc' | 'companyImage'> & {
	imageSrc?: string | null;
	companyImage?: string;
};

export type CompanyEditResponse = Company;
