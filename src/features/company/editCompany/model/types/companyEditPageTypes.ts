import { CreateOrEditCompanyFormValues, Company } from '@/entities/company';

export type CompanyEditFormValues = Omit<CreateOrEditCompanyFormValues, 'imageSrc'> & {
	imageSrc?: string | null;
	companyImage?: string | null;
};
export type CompanyEditBodyRequest = CompanyEditFormValues;
export type CompanyEditResponse = Company;

export type CompanyEditError =
	| 'storage.image.invalid_format'
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'company.company.not_found'
	| 'tinify.tinify.compress_failed'
	| 'storage.image.too_large'
	| 'tinify.tinify.resize_failed';
