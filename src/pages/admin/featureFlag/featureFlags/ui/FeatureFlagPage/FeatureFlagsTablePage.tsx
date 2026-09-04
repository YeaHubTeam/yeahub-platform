import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FeatureFlags, i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { SelectedEntities } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { Text } from '@/shared/ui/Text';

import { FeatureFlagApiItem } from '@/entities/featureFlag';
import { UserRolesList } from '@/entities/user';

import { DeleteFeatureFlagButton } from '@/features/featureFlag/deleteFeatureFlag';
import { ToggleActiveFeatureFlagSwitch } from '@/features/featureFlag/toggleActiveFeatureFlag';

interface FeatureFlagsTableProps {
	featureFlags?: FeatureFlagApiItem[];
	selectedItems?: SelectedEntities<string>;
	onSelectItems?: (ids: SelectedEntities<string>) => void;
}

export const FeatureFlagsTable = ({
	featureFlags,
	selectedItems,
	onSelectItems,
}: FeatureFlagsTableProps) => {
	const { t } = useTranslation([i18Namespace.featureFlags]);
	const navigate = useNavigate();

	const renderTableColumnWidths = () => {
		const columnWidths = {
			flag: 'auto',
			description: 'auto',
			roles: '15%',
			clientType: '15%',
			enabled: '15%',
			createdAt: '15%',
			actions: '10%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			flag: t(FeatureFlags.TABLE_FLAG, { ns: i18Namespace.featureFlags }),
			description: t(FeatureFlags.TABLE_DESCRIPTION, { ns: i18Namespace.featureFlags }),
			roles: t(FeatureFlags.TABLE_ROLES, { ns: i18Namespace.featureFlags }),
			clientType: t(FeatureFlags.TABLE_CLIENT_TYPE, { ns: i18Namespace.featureFlags }),
			enabled: t(FeatureFlags.TABLE_ENABLED, { ns: i18Namespace.featureFlags }),
			createdAt: t(FeatureFlags.TABLE_CREATED_AT, { ns: i18Namespace.featureFlags }),
			actions: t(FeatureFlags.TABLE_ACTIONS, { ns: i18Namespace.featureFlags }),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (featureFlag: FeatureFlagApiItem) => {
		const columns = {
			flag: (
				<TableCellLink
					to={route(ROUTES.admin.featureFlags.details.page, featureFlag.id)}
					text={featureFlag.flag}
				/>
			),
			description: featureFlag.description,
			roles: featureFlag.roles?.length ? (
				<UserRolesList userRoles={featureFlag.roles} />
			) : (
				<Text variant="body3-accent">-</Text>
			),
			clientType: <Text variant="body3-accent">{featureFlag.clientType}</Text>,
			enabled: <ToggleActiveFeatureFlagSwitch id={featureFlag.id} enabled={featureFlag.enabled} />,
			createdAt: (
				<Text variant="body3-accent">{new Date(featureFlag.createdAt).toLocaleDateString()}</Text>
			),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderActions = (featureFlag: FeatureFlagApiItem) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.featureFlags.details.page, featureFlag.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.featureFlags.edit.page, featureFlag.id));
				},
			},
			{
				renderComponent: () => (
					<DeleteFeatureFlagButton featureFlagId={featureFlag.id} disabled={featureFlag.enabled} />
				),
			},
		];

		return (
			<Flex>
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="actions"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!featureFlags) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={featureFlags}
			renderTableColumnWidths={renderTableColumnWidths}
			renderActions={renderActions}
			hasCopyButton
			selectedItems={selectedItems}
			onSelectItems={onSelectItems}
		/>
	);
};
