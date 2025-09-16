import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { Table } from '@/shared/ui/Table';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList/TableCellEntityList';

import {
	ResourceRequest,
	ResourceRequestStatusChip,
	SelectedResourceRequestEntities,
} from '@/entities/resource';

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
			title: t(ResourceRequests.TITLE),
			status: t(ResourceRequests.STATUS),
			specializations: t(ResourceRequests.SPECIALIZATIONS),
			type: t(ResourceRequests.TYPE),
		};
		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (request: ResourceRequest) => {
		const resourceType = request.requestPayload.type || '';
		const columns = {
			title: request.requestPayload.name,
			status: <ResourceRequestStatusChip status={request.status} />,
			specializations: (
				<TableCellEntityList
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
