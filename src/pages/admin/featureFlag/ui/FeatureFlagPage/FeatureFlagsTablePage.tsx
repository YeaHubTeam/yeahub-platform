import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FeatureFlags, i18Namespace, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { SelectedEntities } from '@/shared/libs';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { FeatureFlagApiItem } from '@/entities/featureFlag';

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

	const renderTableColumnWidths = () => {
		const columnWidths = {
			flag: 'auto',
			description: 'auto',
			enabled: '15%',
			roles: '15%',
			clientType: '15%',
			createdAt: '15%',
			actions: '10%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			flag: t(FeatureFlags.TABLE_FLAG, { ns: i18Namespace.featureFlags }),
			description: t(FeatureFlags.TABLE_DESCRIPTION, { ns: i18Namespace.featureFlags }),
			enabled: t(FeatureFlags.TABLE_ENABLED, { ns: i18Namespace.featureFlags }),
			roles: t(FeatureFlags.TABLE_ROLES, { ns: i18Namespace.featureFlags }),
			clientType: t(FeatureFlags.TABLE_CLIENT_TYPE, { ns: i18Namespace.featureFlags }),
			createdAt: t(FeatureFlags.TABLE_CREATED_AT, { ns: i18Namespace.featureFlags }),
			actions: t(FeatureFlags.TABLE_ACTIONS, { ns: i18Namespace.featureFlags }),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (featureFlag: FeatureFlagApiItem) => {
		const columns = {
			flag: (
				<Link to={route(ROUTES.admin.featureFlags.details.page, featureFlag.id)}>
					<Text variant="body3-accent">{featureFlag.flag}</Text>
				</Link>
			),
			description: <Text variant="body3-accent">{featureFlag.description}</Text>,
			roles: <Text variant="body3-accent">{featureFlag.roles.join(', ')}</Text>,
			clientType: <Text variant="body3-accent">{featureFlag.clientType}</Text>,
			createdAt: (
				<Text variant="body3-accent">{new Date(featureFlag.createdAt).toLocaleDateString()}</Text>
			),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
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
			hasCopyButton
			selectedItems={selectedItems}
			onSelectItems={onSelectItems}
		/>
	);
};
