import { CreateOrEditCompanyFormValues, Company } from '@/entities/company';

export type CreateCompanyFormValues = Omit<CreateOrEditCompanyFormValues, 'id'> & {
	companyImage?: string | null;
};

export type CreateCompanyBodyRequest = CreateCompanyFormValues;
export type CreateCompanyResponse = Company;

export type CreateCompanyError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'company.user.not_found'
	| 'tinify.tinify.compress_failed'
	| 'company.company.create_conflict'
	| 'tinify.tinify.resize_failed';
