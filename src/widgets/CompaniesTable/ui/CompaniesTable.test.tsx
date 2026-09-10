import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { Company } from '@/entities/company';

import { CompaniesTable } from './CompaniesTable';

jest.mock('@/features/company/deleteCompany', () => ({
	useDeleteCompanyMutation: () => [jest.fn()],
}));

const companies = [
	{
		id: 'company-1',
		title: 'Company 1',
		disabled: false,
	},
	{
		id: 'company-2',
		title: 'Company 2',
		disabled: true,
	},
] as (Company & { disabled?: boolean })[];

describe('CompaniesTable', () => {
	test('keeps selected company data and skips disabled rows when selecting all', () => {
		const onSelectCompanies = jest.fn();

		renderComponent(
			<CompaniesTable
				companies={companies}
				selectedCompanies={[{ id: 'off-page-company', title: 'Off-page company' }]}
				onSelectCompanies={onSelectCompanies}
			/>,
		);

		const [selectAllCheckbox, , disabledCompanyCheckbox] = screen.getAllByRole('checkbox');
		expect(disabledCompanyCheckbox).toBeDisabled();

		fireEvent.click(selectAllCheckbox);

		expect(onSelectCompanies).toHaveBeenCalledWith([
			{ id: 'off-page-company', title: 'Off-page company' },
			{ id: 'company-1', title: 'Company 1' },
		]);
	});
});
