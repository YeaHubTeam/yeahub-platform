import { CreateOrEditCompanyFormValues, Company } from '@/entities/company';

export type CreateCompanyFormValues = Omit<CreateOrEditCompanyFormValues, 'id'> & {
	companyImage?: string | null;
};

export type CreateCompanyBodyRequest = CreateCompanyFormValues;
export type CreateCompanyResponse = Company;
