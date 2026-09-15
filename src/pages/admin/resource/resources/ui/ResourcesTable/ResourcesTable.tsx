import { useTranslation } from 'react-i18next';

import { Resources, i18Namespace, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { Resource } from '@/entities/resource';

import { useDeleteResourceMutation } from '@/features/resources/deleteResource';

const SPECIALIZATION_SHOW_COUNT = 2;

interface UIResource extends Resource {
	disabled?: boolean;
}

interface ResourcesTableProps {
	resources?: UIResource[];
}

export const ResourcesTable = ({ resources }: ResourcesTableProps) => {
	const { t } = useTranslation([
		i18Namespace.resources,
		i18Namespace.translation,
		i18Namespace.marketplace,
	]);
	const [deleteResourceMutation] = useDeleteResourceMutation();

	const columns: TableColumn<UIResource>[] = [
		{
			id: 'name',
			header: t(Resources.TITLE_SHORT),
			cell: ({ row }) => (
				<TableCellLink to={route(ROUTES.admin.resources.details.route, row.id)} text={row.name} />
			),
		},
		{
			id: 'description',
			header: t(Resources.DESCRIPTION),
			cell: ({ row }) => <Text variant="body3-accent">{row.description}</Text>,
		},
		{
			id: 'type',
			header: t(Resources.TYPE),
			width: '15%',
			cell: ({ row }) => t(`resourceTypes.${row.type.code}`, { ns: i18Namespace.marketplace }),
		},
		{
			id: 'specializations',
			header: t(Resources.SPECIALIZATION_TITLE),
			width: '20%',
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={row.specializations}
					showCount={SPECIALIZATION_SHOW_COUNT}
				/>
			),
		},
	];

	if (!resources) {
		return null;
	}

	return (
		<TableV2
			data={resources}
			columns={columns}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="resources"
			isRowSelectionDisabled={(row) => Boolean(row.disabled)}
			onDelete={(id) => deleteResourceMutation(String(id))}
		/>
	);
};
