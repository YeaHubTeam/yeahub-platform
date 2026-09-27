export { DeleteCompanyButton } from './ui/DeleteCompanyButton/DeleteCompanyButton';
export { DeleteCompanyButtonSkeleton } from './ui/DeleteCompanyButton/DeleteCompanyButton.skeleton';
export { useDeleteCompanyMutation } from './api/deleteCompanyApi';
import { deleteCompanyMock } from './api/__mock__/deleteCompany';

export const deleteCompanyHandlers = [deleteCompanyMock];
