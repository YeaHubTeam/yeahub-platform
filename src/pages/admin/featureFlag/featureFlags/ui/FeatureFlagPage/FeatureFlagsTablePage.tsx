import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace, ROUTES } from '@/shared/config';
import { route, SelectedEntities } from '@/shared/libs';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { FeatureFlagApiItem } from '@/entities/featureFlag';
import { UserRolesList } from '@/entities/user';

import { useDeleteFeatureFlagMutation } from '@/features/featureFlag/deleteFeatureFlag';
import { ToggleActiveFeatureFlagSwitch } from '@/features/featureFlag/toggleActiveFeatureFlag';

interface FeatureFlagsTableRow {
	id: string;
	flag: string;
	description: string;
	roles: FeatureFlagApiItem['roles'];
	clientType: FeatureFlagApiItem['clientType'];
	enabled: boolean;
	createdAt: string;
}

interface FeatureFlagsTableProps {
	featureFlags: FeatureFlagApiItem[];
	selectedItems?: SelectedEntities<string>;
	onSelectItems?: (ids: SelectedEntities<string>) => void;
}

export const FeatureFlagsTable = ({
	featureFlags,
	selectedItems,
	onSelectItems,
}: FeatureFlagsTableProps) => {
	const { t } = useTranslation([i18Namespace.featureFlags]);
	const [deleteFeatureFlag] = useDeleteFeatureFlagMutation();

	const tableData: FeatureFlagsTableRow[] = featureFlags.map((featureFlag) => ({
		id: featureFlag.id,
		flag: featureFlag.flag,
		description: featureFlag.description,
		roles: featureFlag.roles,
		clientType: featureFlag.clientType,
		enabled: featureFlag.enabled,
		createdAt: new Date(featureFlag.createdAt).toLocaleDateString(),
	}));

	const columns: TableColumn<FeatureFlagsTableRow>[] = [
		{
			id: 'flag',
			header: t(FeatureFlags.TABLE_FLAG),
			width: 'auto',
			cell: ({ row, value }) => (
				<TableCellLink
					to={route(ROUTES.admin.featureFlags.details.page, row.id)}
					text={String(value)}
				/>
			),
		},
		{
			id: 'description',
			header: t(FeatureFlags.TABLE_DESCRIPTION),
			width: 'auto',
		},
		{
			id: 'roles',
			header: t(FeatureFlags.TABLE_ROLES),
			width: '250px',
			cell: ({ row }) =>
				row.roles?.length ? (
					<UserRolesList userRoles={row.roles} />
				) : (
					<Text variant="body3-accent">-</Text>
				),
		},
		{
			id: 'clientType',
			header: t(FeatureFlags.TABLE_CLIENT_TYPE),
			width: '150px',
		},
		{
			id: 'enabled',
			header: t(FeatureFlags.TABLE_ENABLED),
			width: '100px',
			cell: ({ row }) => <ToggleActiveFeatureFlagSwitch id={row.id} enabled={row.enabled} />,
		},
		{
			id: 'createdAt',
			header: t(FeatureFlags.TABLE_CREATED_AT),
			width: '150px',
		},
	];

	const selectedRowIds = selectedItems?.map((item) => item.id);

	const selectedById = useMemo(() => {
		const byId = new Map<string, { id: string; title?: string }>();

		selectedItems?.forEach((item) => {
			byId.set(item.id, item);
		});

		featureFlags?.forEach((featureFlag) => {
			byId.set(featureFlag.id, {
				id: featureFlag.id,
				title: featureFlag.flag,
			});
		});

		return byId;
	}, [featureFlags, selectedItems]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectItems?.(
				ids.map((id) => {
					const stringId = String(id);

					return selectedById.get(stringId) ?? { id: stringId };
				}),
			);
		},
		[onSelectItems, selectedById],
	);

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			entity="featureFlags"
			actions={['detail', 'edit', 'copy', 'delete']}
			onDelete={(id) => deleteFeatureFlag(String(id))}
		/>
	);
};
