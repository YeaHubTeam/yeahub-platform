import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn } from '@/shared/ui/TableV2';

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

	const columns = useMemo<TableColumn<ResourceRequest>[]>(
		() => [
			{
				id: 'id',
				header: t(Marketplace.NAME_SHORT, { ns: i18Namespace.marketplace }),
				width: '30%',
				accessor: (row) => row.requestPayload.name,
				cell: ({ row, value }) => (
					<TableCellLink
						to={route(ROUTES.admin.resourceRequests.details.page, row.id)}
						text={String(value)}
					/>
				),
			},
			{
				id: 'status',
				header: t(Marketplace.STATUS_TITLE, { ns: i18Namespace.marketplace }),
				cell: ({ row }) => (
					<div className={styles['status-cell']}>
						<ResourceRequestStatusChip status={row.status} />
					</div>
				),
			},
			{
				id: 'specializations',
				header: t(Marketplace.SPECIALIZATIONS_SHORT, { ns: i18Namespace.marketplace }),
				cell: ({ row }) => (
					<TableCellEntityList
						url={ROUTES.admin.specializations.details.page}
						items={row.specializations}
						showCount={SPECIALIZATION_SHOW_COUNT}
					/>
				),
			},
			{
				id: 'requestPayload',
				header: t(Marketplace.TYPES_SHORT, { ns: i18Namespace.marketplace }),
				width: '20%',
				accessor: (row) => row.requestPayload.type || '',
				cell: ({ value }) =>
					t(`resourceTypes.${value}`, {
						ns: i18Namespace.marketplace,
						defaultValue: String(value),
					}),
			},
		],
		[t],
	);

	const selectedRowIds = useMemo(() => {
		if (!selectedResourceRequests) return [];
		if (Array.isArray(selectedResourceRequests)) {
			return selectedResourceRequests.map((req) => req.id);
		}
		return Object.keys(selectedResourceRequests);
	}, [selectedResourceRequests]);

	const handleSelectedRowIdsChange = (ids: (string | number)[]) => {
		if (!resourceRequests || !onSelectResourceRequests) return;

		const selectedEntities = resourceRequests.filter((req) => ids.includes(req.id));
		onSelectResourceRequests(selectedEntities as unknown as SelectedResourceRequestEntities);
	};

	if (!resourceRequests) return null;

	return (
		<TableV2
			data={resourceRequests}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectResourceRequests ? handleSelectedRowIdsChange : undefined}
			entity="resourceRequests"
			actions={['detail', 'copy']}
		/>
	);
};
