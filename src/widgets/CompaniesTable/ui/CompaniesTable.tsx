import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Companies, i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';

import { Company } from '@/entities/company';

import { useDeleteCompanyMutation } from '@/features/company/deleteCompany';

import styles from './CompaniesTable.module.css';

interface UICompany extends Company {
	disabled?: boolean;
}

interface CompaniesTableProps {
	companies?: UICompany[];
	selectedCompanies?: SelectedAdminEntities<string>;
	onSelectCompanies?: (ids: SelectedAdminEntities<string>) => void;
}

export const CompaniesTable = ({
	companies,
	selectedCompanies,
	onSelectCompanies,
}: CompaniesTableProps) => {
	const { t } = useTranslation([i18Namespace.companies, i18Namespace.translation]);
	const [deleteCompany] = useDeleteCompanyMutation();

	const columns: TableColumn<UICompany>[] = [
		{
			id: 'imageSrc',
			header: t(Companies.ICON_SHORT),
			width: '100px',
			cell: ({ row }) => (
				<ImageWithWrapper
					src={row.imageSrc}
					alt={`${t(Translation.LOGO)} ${row.title}`}
					className={styles['card-image']}
				/>
			),
		},
		{
			id: 'title',
			header: t(Companies.TITLE_SHORT),
			width: '100%',
			cell: ({ row, value }) => (
				<TableCellLink
					to={route(ROUTES.admin.companies.details.route, row.id)}
					text={String(value)}
				/>
			),
		},
	];

	const selectedRowIds = selectedCompanies?.map((company) => company.id);

	const selectedById = useMemo(() => {
		const byId = new Map<string, { id: string; title?: string }>();

		selectedCompanies?.forEach((company) => byId.set(company.id, company));
		companies?.forEach((company) => {
			byId.set(company.id, { id: company.id, title: company.title });
		});

		return byId;
	}, [companies, selectedCompanies]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectCompanies?.(ids.map((id) => selectedById.get(String(id)) ?? { id: String(id) }));
		},
		[onSelectCompanies, selectedById],
	);

	if (!companies) {
		return null;
	}

	return (
		<TableV2
			data={companies}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="companies"
			disabledActionsTooltipTitle={Translation.TOOLTIP_COMPANY_DISABLED_INFO}
			onDelete={(id) => void deleteCompany(String(id))}
		/>
	);
};
