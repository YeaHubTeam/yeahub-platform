import { useTranslation } from 'react-i18next';

import { FeatureFlagsTranslation, i18Namespace, ROUTES } from '@/shared/config';
import { formatDate, route, type SelectedAdminEntities } from '@/shared/libs';
import { StatusChip, type StatusChipVariant } from '@/shared/ui/StatusChip';
import { Switch } from '@/shared/ui/Switch';
import { Table } from '@/shared/ui/Table';
import { TableCellLink } from '@/shared/ui/TableCellLink';

import type { ClientType, FeatureFlagApiItem } from '@/entities/featureFlag';
import { UserRolesList } from '@/entities/user';

interface FeatureFlagsTableProps {
	flags: FeatureFlagApiItem[];
	selectedFlags: SelectedAdminEntities<string>;
	onSelectFlags: (ids: SelectedAdminEntities<string>) => void;
}

const clientTypeVariants: Record<ClientType, StatusChipVariant> = {
	WEB: 'green',
	IOS: 'purple',
	ANDROID: 'purple',
};

export const FeatureFlagsTable = ({
	flags,
	selectedFlags,
	onSelectFlags,
}: FeatureFlagsTableProps) => {
	const { t } = useTranslation(i18Namespace.featureFlags);

	const flagsWithTitle = flags.map((flag) => ({ ...flag, title: flag.flag }));

	const renderTableColumnWidths = () => {
		const columnWidths = {
			flag: '25%',
			description: 'auto',
			roles: '15%',
			clientType: '10%',
			enabled: '10%',
			createdAt: '12%',
		};

		return Object.values(columnWidths).map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			flag: t(FeatureFlagsTranslation.TABLE_FLAG),
			description: t(FeatureFlagsTranslation.TABLE_DESCRIPTION),
			roles: t(FeatureFlagsTranslation.TABLE_ROLES),
			clientType: t(FeatureFlagsTranslation.TABLE_CLIENT_TYPE),
			enabled: t(FeatureFlagsTranslation.TABLE_ENABLED),
			createdAt: t(FeatureFlagsTranslation.TABLE_CREATED_AT),
		};

		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (flag: FeatureFlagApiItem) => {
		const columns = {
			flag: (
				<TableCellLink
					to={route(ROUTES.admin.featureFlags.details.page, flag.id)}
					text={flag.flag}
				/>
			),
			description: flag.description,
			roles: <UserRolesList userRoles={flag.roles} />,
			clientType: (
				<StatusChip
					status={{ variant: clientTypeVariants[flag.clientType], text: flag.clientType }}
				/>
			),
			enabled: <Switch checked={flag.enabled} disabled onChange={() => undefined} />,
			createdAt: flag.createdAt ? formatDate(new Date(flag.createdAt), 'dd.MM.yyyy') : '',
		};

		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	return (
		<Table
			items={flagsWithTitle}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderTableColumnWidths={renderTableColumnWidths}
			selectedItems={selectedFlags}
			onSelectItems={onSelectFlags}
			hasCopyButton
		/>
	);
};
