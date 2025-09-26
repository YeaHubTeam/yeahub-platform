import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { StatusChip, StatusChipItem } from '@/shared/ui/StatusChip';

import { ResourceRequestStatus } from '../../model/types/resourceRequest';

interface ResourceRequestStatusProps {
	status: ResourceRequestStatus;
}

export const ResourceRequestStatusChip = ({ status }: ResourceRequestStatusProps) => {
	const { t } = useTranslation(i18Namespace.resources);

	const resourceRequestsStatuses: Record<ResourceRequestStatus, StatusChipItem> = {
		pending: {
			variant: 'yellow',
			text: t(ResourceRequests.STATUS_REVIEW),
		},
		approved: {
			variant: 'green',
			text: t(ResourceRequests.STATUS_APPROVED),
		},
		rejected: {
			variant: 'red',
			text: t(ResourceRequests.STATUS_REJECTED),
		},
	};

	return <StatusChip status={resourceRequestsStatuses[status]} />;
};
