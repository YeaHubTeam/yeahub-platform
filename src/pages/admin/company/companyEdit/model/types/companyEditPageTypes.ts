import { CreateOrEditCompanyFormValues, Company } from '@/entities/company';

export type CompanyEditFormValues = CreateOrEditCompanyFormValues;
export type CompanyEditBodyRequest = CompanyEditFormValues;
export type CompanyEditResponse = Company;
