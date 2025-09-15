import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { StatusChip } from '@/shared/ui/StatusChip';
import { StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';

interface ExternalProductStatusProps {
	statusCode: string;
}

export const ExternalProductStatus = ({ statusCode }: ExternalProductStatusProps) => {
	const { t } = useTranslation([i18Namespace.externalProducts]);

	const statusColors: Record<string, StatusChipVariant> = {
		approved: 'green',
		review: 'yellow',
		rejected: 'red',
	};

	const statusTexts: Record<string, string> = {
		approved: t('statusList.approved'),
		review: t('statusList.review'),
		rejected: t('statusList.rejected'),
	};

	const status = {
		variant: statusColors[statusCode] || 'gray',
		text: statusTexts[statusCode] || statusCode,
	};

	return <StatusChip status={status} />;
};
