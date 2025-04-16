import { CreateOrEditCompanyFormValues, Company } from '@/entities/company/model/types/company';

export type CreateCompanyFormValues = Omit<CreateOrEditCompanyFormValues, 'id'>;

export type CreateCompanyBodyRequest = CreateCompanyFormValues;
export type CreateCompanyResponse = Company;
