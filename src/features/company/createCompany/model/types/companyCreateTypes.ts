import { CreateOrEditCompanyFormValues, Company } from '@/entities/company';

export type CreateCompanyFormValues = Omit<CreateOrEditCompanyFormValues, 'id' | 'imageSrc'> & {
	imageSrc: string | null;
	companyImage: string | null;
};

export type CreateCompanyBodyRequest = Omit<
	CreateCompanyFormValues,
	'imageSrc' | 'companyImage'
> & {
	imageSrc?: string;
	companyImage?: string;
};

export type CreateCompanyResponse = Company;

export type CreateCompanyError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'company.user.not_found'
	| 'tinify.tinify.compress_failed'
	| 'company.company.create_conflict'
	| 'tinify.tinify.resize_failed';
