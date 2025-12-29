import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Marketplace, Translation, i18Namespace, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { Text } from '@/shared/ui/Text';

import {
	ResourceRequest,
	ResourceRequestStatusChip,
	SelectedResourceRequestEntities,
} from '@/entities/resource';

import styles from './ResourceRequestsTable.module.css';

const SPECIALIZATION_SHOW_COUNT = 2;

interface ResourceRequestsTableProps {
	resourceRequests?: ResourceRequest[];
	selectedResourceRequests?: SelectedResourceRequestEntities;
	onSelectResourceRequests?: (ids: SelectedResourceRequestEntities) => void;
}

interface UIResource extends ResourceRequest {
	disabled?: boolean;
}

export const ResourceRequestsTable = ({
	resourceRequests,
	selectedResourceRequests,
	onSelectResourceRequests,
}: ResourceRequestsTableProps) => {
	const { t } = useTranslation([
		i18Namespace.resources,
		i18Namespace.marketplace,
		i18Namespace.translation,
	]);

	const navigate = useNavigate();

	const renderTableHeader = () => {
		const columns = {
			title: t(Marketplace.NAME_SHORT, { ns: i18Namespace.marketplace }),
			status: t(Marketplace.STATUS_TITLE, { ns: i18Namespace.marketplace }),
			specializations: t(Marketplace.SPECIALIZATIONS_SHORT, { ns: i18Namespace.marketplace }),
			type: t(Marketplace.TYPES_SHORT, { ns: i18Namespace.marketplace }),
		};
		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: '30%',
			status: 'auto',
			specializations: 'auto',
			type: '20%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableBody = (request: ResourceRequest) => {
		const resourceType = request.requestPayload.type || '';
		const columns = {
			title: request.requestPayload.name,
			status: (
				<div className={styles['status-cell']}>
					<ResourceRequestStatusChip status={request.status} />
				</div>
			),
			specializations: (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={request.specializations}
					showCount={SPECIALIZATION_SHOW_COUNT}
				/>
			),
			type: t(`resourceTypes.${request.requestPayload.type}`, {
				ns: i18Namespace.marketplace,
				defaultValue: resourceType,
			}),
		};
		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k}>
				{k === 'title' ? (
					<Link to={route(ROUTES.admin.resources.requests.view.page, request.id)}>
						<Text variant="body3" color="purple-700">
							{v}
						</Text>
					</Link>
				) : (
					v
				)}
			</td>
		));
	};

	const renderActions = (resource: UIResource) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.resources.requests.view.route, resource.id));
				},
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
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

	if (!resourceRequests) return null;

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={resourceRequests}
			selectedItems={selectedResourceRequests}
			onSelectItems={onSelectResourceRequests}
			renderTableColumnWidths={renderTableColumnWidths}
			hasCopyButton
		/>
	);
};
