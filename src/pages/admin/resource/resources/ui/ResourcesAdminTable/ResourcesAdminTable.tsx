import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Resources, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2 } from '@/shared/ui/TableV2';
import type { TableColumn, TableRowId } from '@/shared/ui/TableV2';

import type { Resource } from '@/entities/resource';

interface ResourcesAdminTableProps {
	resources: Resource[];
}

export const ResourcesAdminTable = ({ resources }: ResourcesAdminTableProps) => {
	const { t } = useTranslation(i18Namespace.resources);

	const columns: TableColumn<Resource>[] = [
		{
			id: 'name',
			header: t(Resources.NAME),
			cell: ({ row }) => row.name,
		},
		{
			id: 'specializations',
			header: t(Resources.SPECIALIZATION_TITLE),
			cell: ({ row }) => (
				<TableCellEntityList
					items={row.specializations}
					showCount={2}
					url={ROUTES.admin.specializations.details.page}
				/>
			),
		},
		{
			id: 'skills',
			header: t(Resources.SKILLS),
			cell: ({ row }) => (
				<TableCellEntityList
					items={row.skills}
					showCount={4}
					url={ROUTES.admin.skills.details.page}
				/>
			),
		},
		{
			id: 'type',
			header: t(Resources.TYPE),
			cell: ({ row }) =>
				t(`resourceTypes.${row.type.code}`, {
					ns: i18Namespace.marketplace,
				}),
		},
		{
			id: 'url',
			header: t(Resources.LINK),
			cell: ({ row }) => (
				<a href={row.url} target="_blank" rel="noopener noreferrer">
					{t(Resources.LINK)}
				</a>
			),
		},
		{
			id: 'createdBy',
			header: t(Resources.AUTHOR),
			cell: ({ row }) => (
				<TableCellLink
					to={route(ROUTES.admin.users.detail.page, row.createdBy.id)}
					text={row.createdBy.username}
				/>
			),
		},
		{
			id: 'createdAt',
			header: t(Resources.CREATED_AT),
			cell: ({ row }) => new Date(row.createdAt).toLocaleDateString('ru-RU'),
		},
	];
	const [selectedRowIds, setSelectedRowIds] = useState<TableRowId[]>([]);

	return (
		<TableV2
			data={resources}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={setSelectedRowIds}
			actions={['copy']}
		/>
	);
};
