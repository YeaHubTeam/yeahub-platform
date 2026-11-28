import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Companies, i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { type TableColumn, type TableRowId, TableV2 } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { CompaniesTableItem } from '../lib/mapCompaniesToTableItems';

import styles from './CompaniesTable.module.css';

interface CompaniesTableProps {
	companies?: CompaniesTableItem[];
	selectedCompanies?: SelectedAdminEntities<string>;
	onSelectCompanies?: (ids: SelectedAdminEntities<string>) => void;
}

export const CompaniesTable = ({
	companies,
	selectedCompanies,
	onSelectCompanies,
}: CompaniesTableProps) => {
	const { t } = useTranslation([i18Namespace.companies, i18Namespace.translation]);

	const columns: Array<TableColumn<CompaniesTableItem>> = [
		{
			id: 'imageSrc',
			header: t(Companies.ICON_SHORT),
			width: '160px',
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
			width: '480px',
			cell: ({ row }) => (
				<Text variant="body3-accent" maxRows={1} isLimitSize>
					{row.title}
				</Text>
			),
		},
		{
			id: 'author',
			header: t(Companies.AUTHOR),
			width: '200px',
			cell: ({ row }) =>
				row.authorId ? (
					<TableCellLink
						to={route(ROUTES.admin.users.detail.page, row.authorId)}
						text={row.author}
					/>
				) : (
					row.author
				),
		},
		{
			id: 'createdAt',
			header: t(Companies.CREATED_AT),
		},
	];

	const selectedRowIds = selectedCompanies?.map((company) => company.id);

	const selectedById = useMemo(() => {
		const byId = new Map<string, { id: string; title?: string }>();

		selectedCompanies?.forEach((company) => byId.set(String(company.id), company));

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

	if (!companies) return null;

	return (
		<TableV2
			data={companies}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['copy']}
		/>
	);
};
