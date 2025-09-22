import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Table } from '@/shared/ui/Table';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList/TableCellEntityList';

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

export const ResourceRequestsTable = ({
	resourceRequests,
	selectedResourceRequests,
	onSelectResourceRequests,
}: ResourceRequestsTableProps) => {
	const { t } = useTranslation([i18Namespace.resources, i18Namespace.marketplace]);

	const renderTableHeader = () => {
		const columns = {
			title: t(Marketplace.NAME_SHORT, { ns: i18Namespace.marketplace }),
			status: t(Marketplace.STATUS_TITLE, { ns: i18Namespace.marketplace }),
			specializations: t(Marketplace.SPECIALIZATIONS_SHORT, { ns: i18Namespace.marketplace }),
			type: t(Marketplace.TYPES_SHORT, { ns: i18Namespace.marketplace }),
		};
		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
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
		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	if (!resourceRequests) return null;

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={resourceRequests}
			selectedItems={selectedResourceRequests}
			onSelectItems={onSelectResourceRequests}
		/>
	);
};
