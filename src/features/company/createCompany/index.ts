export { useCreateCompanyMutation } from './api/createCompanyApi';
export { CompanyCreateForm } from './ui/CompanyCreateForm/CompanyCreateForm';
export { getCreateCompanyApiErrorMessage } from './lib/utils/getCreateCompanyApiErrorMessage';
import { createCompanyMock } from './api/__mock__/createCompany';

export const createCompanyHandlers = [createCompanyMock];
