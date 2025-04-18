import { CreateOrEditCompanyFormValues, ICompany } from '@/entities/company';

export type CreateCompanyFormValues = Omit<CreateOrEditCompanyFormValues, 'id'>;

export type CreateCompanyBodyRequest = CreateCompanyFormValues;
export type CreateCompanyResponse = ICompany;
