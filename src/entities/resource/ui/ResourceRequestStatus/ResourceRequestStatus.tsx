import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { StatusChip } from '@/shared/ui/StatusChip';
import { StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';

import { ResourceRequestStatus } from '../../model/types/resourceRequest';

interface ResourceRequestStatusProps {
	status: ResourceRequestStatus;
}

export const ResourceRequestStatusChip = ({ status }: ResourceRequestStatusProps) => {
	const { t } = useTranslation([i18Namespace.resources]);

	const statusConfig: Record<ResourceRequestStatus, { variant: StatusChipVariant; text: string }> =
		{
			[ResourceRequestStatus.PENDING]: {
				variant: 'yellow',
				text: t(ResourceRequests.STATUS_PENDING),
			},
			[ResourceRequestStatus.APPROVED]: {
				variant: 'green',
				text: t(ResourceRequests.STATUS_APPROVED),
			},
			[ResourceRequestStatus.REJECTED]: {
				variant: 'red',
				text: t(ResourceRequests.STATUS_REJECTED),
			},
		};

	const config = statusConfig[status] || { variant: 'gray', text: status };

	return <StatusChip status={config} />;
};
